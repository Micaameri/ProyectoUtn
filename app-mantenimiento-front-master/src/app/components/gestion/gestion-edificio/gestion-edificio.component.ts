import { Component, OnInit } from '@angular/core';
import { EdificioService } from '../../../services/edificio.service';
import { Edificio } from '../../../interfaces/edificio';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-gestion-edificio',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './gestion-edificio.component.html',
  styleUrl: './gestion-edificio.component.css'
})
export class GestionEdificioComponent implements OnInit {


@Component({
  selector: 'app-gestion-edificios',
  templateUrl: './gestion-edificios.component.html',
  styleUrls: ['./gestion-edificios.component.css']
})

  edificios: Edificio[] = [];
  nuevoEdificio = { nombre: '', direccion: '' };

  constructor(private edificioService: EdificioService,private router:Router) {}
  goBack() {
    this.router.navigate(['/gestion']);
  }
  ngOnInit(): void {
    this.cargarEdificios();
  }

  async cargarEdificios() {
    try {
      this.edificios = await this.edificioService.obtenerEdificios();
    } catch (error) {
      console.error('Error al cargar edificios:', error);
    }
  }
  async crearEdificio() {
    if (this.nuevoEdificio.nombre.trim() === '' || this.nuevoEdificio.direccion.trim() === '') {
      alert('Por favor, completa todos los campos antes de crear el edificio.');
      return;
    }
  
    const confirmacion = window.confirm('¿Estás seguro de que deseas crear este edificio?');
    if (confirmacion) {
      try {
        await this.edificioService.crearEdificio(this.nuevoEdificio);
        this.cargarEdificios();
        this.nuevoEdificio = { nombre: '', direccion: '' }; 
        alert('El edificio fue creado exitosamente.');
      } catch (error) {
        console.error('Error al crear edificio:', error);
        alert('Ocurrió un error al crear el edificio.');
      }
    }
  }
  
  async eliminarEdificio(id: number) {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este edificio?');
    if (confirmacion) {
      try {
        await this.edificioService.eliminarEdificio(id);
        this.cargarEdificios();
        alert('El edificio fue eliminado exitosamente.');
      } catch (error) {
        console.error('Error al eliminar edificio:', error);
        alert('Ocurrió un error al eliminar el edificio.');
      }
    }
  }
  
}


