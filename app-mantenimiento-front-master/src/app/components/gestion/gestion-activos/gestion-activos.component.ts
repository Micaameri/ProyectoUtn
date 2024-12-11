import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivoService } from '../../../services/activo.service';
import { NuevoActivo } from '../../../interfaces/nuevo-activo';
import { Activo } from '../../../interfaces/activo';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-gestion-activos',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './gestion-activos.component.html',
  styleUrl: './gestion-activos.component.css',
})
export class GestionActivosComponent  implements OnInit {
  activos: Activo[] = [];
  nuevoActivo: NuevoActivo = {tipo: '', tag_diminutivo: ''};
  constructor(private router: Router,private activoService: ActivoService) {}
  async ngOnInit(): Promise<void> {
    await this.obtenerActivos();
  } 
  async obtenerActivos(): Promise<void> {
    try {
      this.activos = await this.activoService.obtenerActivos();
    } catch (error) {
      console.error('Error al obtener activos', error);
    }
  }
  async crearActivo() {
    if (this.nuevoActivo.tipo.trim() === '' || this.nuevoActivo.tag_diminutivo.trim() === '') {
      alert('Por favor, completa todos los campos del formulario.');
      return;
    }
    
    if (window.confirm('¿Estás seguro de que deseas crear este activo?')) {
      try {
        await this.activoService.crearActivo(this.nuevoActivo);
        this.obtenerActivos(); 
        this.nuevoActivo = { tipo: '', tag_diminutivo: '' }; 
      } catch (error) {
        console.error('Error al crear activo:', error);
      }
    }
  }
  
  async eliminarActivo(id: string) {
    if (window.confirm('¿Estás seguro de que deseas eliminar este activo?')) {
      try {
        await this.activoService.eliminarActivo(id);
        this.obtenerActivos(); 
      } catch (error) {
        console.error('Error al eliminar activo:', error);
      }
    }
  }
  
  goBack() {
    this.router.navigate(['/gestion']);
  }
}
