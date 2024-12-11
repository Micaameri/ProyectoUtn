import { Component, OnInit } from '@angular/core';
import { OrdenTrabajoService } from '../../services/orden-trabajo.service';

import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../../services/auth.service';
import { OrdenTrabajoBackend } from '../../interfaces/orden-trabajo-backend';


@Component({
  selector: 'app-dashboard-operario',
  templateUrl: './dashboard-operario.component.html',
  styleUrls: ['./dashboard-operario.component.css'],
  standalone: true,
  imports: [CommonModule]  
})
export class DashboardOperarioComponent implements OnInit {

  nombre: string | null = null;
  ordenesPendientes: OrdenTrabajoBackend[] = [];
  tiempoInicio: { [key: number]: Date } = {};
  constructor(
    private ordenTrabajoService: OrdenTrabajoService,
    private router: Router,
    private authService:AuthService
   
  ) {}

  async ngOnInit(): Promise<void> {
    this.nombre = this.authService.getUserName();
    const usuario = this.authService.getUser();
    if (usuario) {
      this.cargarOrdenesPendientes(usuario.id_usuario);
    }
  }

  async cargarOrdenesPendientes(id_usuario: number): Promise<void> {
    try {
      this.ordenesPendientes = await this.ordenTrabajoService.obtenerOrdenesPendientes(id_usuario);
    } catch (error) {
      console.error('Error al cargar órdenes pendientes:', error);
    }
  }


  comenzarTarea(id_orden: number): void {
    this.tiempoInicio[id_orden] = new Date();
    alert(`Tarea ${id_orden} iniciada a las ${this.tiempoInicio[id_orden]}`);
  }

  async finalizarTarea(id_orden: number): Promise<void> {
    const inicio = this.tiempoInicio[id_orden];
    if (!inicio) {
      alert('Debes comenzar la tarea antes de finalizarla.');
      return;
    }

    const tiempoEmpleado = Math.round((new Date().getTime() - inicio.getTime()) / 1000); 
    try {
      await this.ordenTrabajoService.finalizarOrdenTrabajo(id_orden, tiempoEmpleado);
      alert('Tarea finalizada con éxito.');
      delete this.tiempoInicio[id_orden];
      const usuario = this.authService.getUser();
      if (usuario) {
        this.cargarOrdenesPendientes(usuario.id_usuario);
      }
    } catch (error) {
      console.error('Error al finalizar tarea:', error);
    }
  }


  goBack() {
    this.router.navigate(['/login']);
  }


}
