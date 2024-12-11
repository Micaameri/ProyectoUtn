import { Component, OnInit } from '@angular/core';
import { UbicacionService } from '../../../services/ubicacion.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UbicacionActivo } from '../../../interfaces/ubicacion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-ubicacion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './gestion-ubicaciones.component.html',
  styleUrls: ['./gestion-ubicaciones.component.css'],
})
export class GestionUbicacionComponent implements OnInit {
  ubicaciones: UbicacionActivo[] = [];
  nuevaUbicacion = { ubicacion: '' };

  constructor(private ubicacionService: UbicacionService,private router:Router) {}

  ngOnInit(): void {
    this.cargarUbicaciones();
  }
  
  async cargarUbicaciones(): Promise<void> {
    try {
      this.ubicaciones = await this.ubicacionService.obtenerUbicaciones();
    } catch (error) {
      console.error('Error al cargar ubicaciones:', error);
    }
  }
  async crearUbicacion() {
    if (this.nuevaUbicacion.ubicacion.trim() === '') {
      alert('Por favor, ingresa un nombre para el sector.');
      return;
  }
    if (window.confirm('¿Estás seguro de que deseas crear esta ubicación?')) {
      try {
        await this.ubicacionService.crearUbicacion(this.nuevaUbicacion);
        alert('Ubicacion creado exitosamente.');
        this.cargarUbicaciones();
        this.nuevaUbicacion = { ubicacion: '' }; 
      } catch (error) {
        console.error('Error al crear ubicación:', error);
      }
    }
  }
  
  async eliminarUbicacion(id: number) {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta ubicación?')) {
      try {
        await this.ubicacionService.eliminarUbicacion(id);
        alert('Ubicacion eliminado exitosamente.');
        this.cargarUbicaciones();
      } catch (error) {
        console.error('Error al eliminar ubicación:', error);
      }
    }
  }
  goBack() {
    this.router.navigate(['/gestion']);
  }
}
