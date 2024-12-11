import { Component, OnInit } from '@angular/core';
import { PisoService } from '../../../services/piso.service';
import { Piso } from '../../../interfaces/piso';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-piso',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './gestion-piso.component.html',
  styleUrls: ['./gestion-piso.component.css'],
})
export class GestionPisoComponent implements OnInit {
  pisos: Piso[] = [];
  nuevoPiso: { piso: string } = { piso: '' };

  constructor(private pisoService: PisoService,private router:Router) {}
  goBack() {
    this.router.navigate(['/gestion']);
  }
  async ngOnInit(): Promise<void> {
    await this.cargarPisos();
  }

  async cargarPisos(): Promise<void> {
    try {
      this.pisos = await this.pisoService.obtenerPisos();
    } catch (error) {
      console.error('Error al cargar pisos:', error);
    }
  }
  async crearPiso() {
    if (this.nuevoPiso.piso.trim() === '') {
      alert('Por favor, completa el campo de nombre del piso.');
      return;
    }
  
    const confirmacion = window.confirm('¿Estás seguro de que deseas crear este piso?');
    if (confirmacion) {
      try {
        await this.pisoService.crearPiso(this.nuevoPiso);
        this.cargarPisos();
        this.nuevoPiso = { piso: '' };
        alert('Piso creado exitosamente.');
      } catch (error) {
        console.error('Error al crear piso:', error);
      }
    }
  }
  
  async eliminarPiso(id: number) {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este piso?');
    if (confirmacion) {
      try {
        await this.pisoService.eliminarPiso(id);
        this.cargarPisos();
        alert('Piso eliminado exitosamente.');
      } catch (error) {
        console.error('Error al eliminar piso:', error);
      }
    }
  }
  
}
