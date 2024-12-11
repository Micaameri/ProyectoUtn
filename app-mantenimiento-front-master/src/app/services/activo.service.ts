import { Injectable } from '@angular/core';
import { Activo } from '../interfaces/activo';

@Injectable({
  providedIn: 'root'
})
export class ActivoService {

  private apiUrl = 'http://localhost:3000/api/activos';

  constructor() {}


  async obtenerActivos(): Promise<Activo[]> {
    const response = await fetch(this.apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error || 'Error al obtener activos');
    }

    return await response.json();
  }
  async crearActivo(activo: { tipo: string; tag_diminutivo: string}): Promise<Activo> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(activo)
      });
  
      if (!response.ok) {
        throw new Error(`Error al crear el activo: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Respuesta del servidor:', data); 
      return data;
    } catch (error) {
      console.error('Error en el servicio al crear el activo:', error);
      throw error;
    }
  }
  
  async eliminarActivo(id: string): Promise<{ message: string }> {
    try {
      console.log(`Eliminando activo con id: ${id}`); 
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: 'DELETE',
      });
  
      const result = await response.json();
      console.log('Respuesta del servidor:', result); 
      return result;
    } catch (error) {
      console.error('Error en el servicio al eliminar el activo:', error);
      throw error;
    }
  }
  
}

