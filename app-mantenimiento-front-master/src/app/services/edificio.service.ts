import { Injectable } from '@angular/core';
import { Edificio } from '../interfaces/edificio';

@Injectable({
  providedIn: 'root'
})
export class EdificioService {
  private apiUrl = 'http://localhost:3000/api';

  constructor() {}

  async obtenerEdificios(): Promise<Edificio[]> {
    const response = await fetch(`${this.apiUrl}/lista-edificios`);
    if (!response.ok) {
      throw new Error('Error al obtener los edificios');
    }
    return await response.json();
  }

  async crearEdificio(edificio: { nombre: string; direccion: string }): Promise<Edificio> {
    console.log('Datos enviados al backend:', edificio); 
    try {
      const response = await fetch(`${this.apiUrl}/edificio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(edificio),
      });
      if (!response.ok) {
        throw new Error('Error al crear el edificio');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en crearEdificio:', error);
      throw error;
    }
  }
  

  async eliminarEdificio(id: number): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/edificio/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el edificio');
      }
    } catch (error) {
      console.error('Error en eliminarEdificio:', error);
    }
  }
}
