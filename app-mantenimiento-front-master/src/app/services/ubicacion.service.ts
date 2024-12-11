import { Injectable } from '@angular/core';
import { UbicacionActivo } from '../interfaces/ubicacion';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  private apiUrl = 'http://localhost:3000/api'; 

  constructor() {}

  async crearUbicacion(ubicacion: UbicacionActivo): Promise<UbicacionActivo> {
    const response = await fetch(`${this.apiUrl}/ubi-activo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ubicacion),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error || 'Error al crear la ubicación de activo');
    }

    return await response.json();
  }
  async eliminarUbicacion(id: number): Promise<void> {
    const response = await fetch(`${this.apiUrl}/ubi-activo/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error al eliminar la ubicación');
    }
  }
  
  async obtenerUbicaciones(): Promise<UbicacionActivo[]> {
    const response = await fetch(`${this.apiUrl}/lista-ubi-activos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error || 'Error al obtener ubicaciones de activos');
    }

    return await response.json();
  }
}
