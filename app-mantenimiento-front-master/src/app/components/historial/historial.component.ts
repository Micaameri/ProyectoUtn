import { Component, OnInit,HostListener } from '@angular/core';
import { OrdenTrabajoService } from '../../services/orden-trabajo.service';
import { ActivoService } from '../../services/activo.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdenTrabajoBackend } from '../../interfaces/orden-trabajo-backend';
import { Activo } from '../../interfaces/activo';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})

export class HistorialComponent implements OnInit {

  listaOrdenes: OrdenTrabajoBackend[] = [];
  activos: Activo[] = [];
  operarios: User[] = [];
  filtroActivo: string[] = [];
  filtroOperario: string[] = []; 
  filtroFecha = ''; 
  filtroEstado = ''; 
  activoDropdownVisible: boolean = false;
  operarioDropdownVisible: boolean = false;


  constructor(
    private ordenTrabajoService: OrdenTrabajoService,
    private activoService: ActivoService,
    private userService: UserService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.cargarOrdenesTrabajo();
    await this.cargarActivos();
    await this.cargarOperarios();
  }
  segundosAMinutos(segundos: number): string {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos} minutos y ${segundosRestantes} segundos`;
  }
  
  async cargarOrdenesTrabajo(): Promise<void> {
    this.listaOrdenes = await this.ordenTrabajoService.obtenerOrdenesTrabajo();
  }

  async cargarActivos(): Promise<void> {
    this.activos = await this.activoService.obtenerActivos();
  }

  async cargarOperarios(): Promise<void> {
    this.operarios = await this.userService.obtenerOperarios();
  }


  toggleActivoDropdown() {
    this.activoDropdownVisible = !this.activoDropdownVisible;
  }

  toggleOperarioDropdown() {
    this.operarioDropdownVisible = !this.operarioDropdownVisible;
  }
  
  onCheckboxChange(event: Event, idActivo: string) {
    const checkbox = event.target as HTMLInputElement; 
    if (checkbox.checked) {
      this.filtroActivo.push(idActivo);
    } else {
      this.filtroActivo = this.filtroActivo.filter((id) => id !== idActivo);
    }
  }
  
  onCheckboxOperarioChange(event: Event, idOperario: string) {
    const checkbox = event.target as HTMLInputElement; 
    if (checkbox.checked) {
      this.filtroOperario.push(idOperario);
    } else {
      this.filtroOperario = this.filtroOperario.filter((id) => id !== idOperario);
    }
  }
  
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.activoDropdownVisible = false;
      this.operarioDropdownVisible = false;
    }
  }
    

  onOperarioChange(): void {
    this.filtrarOrdenes();
  }

  onFechaChange(): void {
    this.filtrarOrdenes();
  }

  onEstadoChange(): void {
    this.filtrarOrdenes();
  }

  filtrarOrdenes(): void {
    this.ordenTrabajoService
      .obtenerOrdenesTrabajoFiltradas(
        this.filtroActivo.join(','), 
        this.filtroOperario.join(','), 
        this.filtroFecha || '', 
        this.filtroEstado || ''
      )
      .then((ordenes: OrdenTrabajoBackend[]) => {
        this.listaOrdenes = ordenes;
        console.log('Órdenes filtradas:', this.listaOrdenes);
      })
      .catch((error) =>
        console.error('Error al obtener órdenes de trabajo filtradas:', error)
      );
  }
  
  async eliminarOrden(orden_trabajo_id: number) {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta orden de trabajo?')) {
      try {
        await this.ordenTrabajoService.eliminarOrden(orden_trabajo_id);
        alert('Orden eliminada exitosamente.');
        this.cargarOrdenesTrabajo();
      } catch (error) {
        console.error('Error al eliminar ubicación:', error);
      }
    }
  }
  goBack(): void {
    this.router.navigate(['/dashboard-admin']);
  }
}