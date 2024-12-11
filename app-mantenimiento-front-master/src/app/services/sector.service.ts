import { Injectable } from '@angular/core';
import { Sector } from '../interfaces/sector';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  private apiUrl = 'http://localhost:3000/api/sectores'; 

  constructor() {}
  async crearSector(sector: { sector: string }): Promise<void> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sector),
      });
      if (!response.ok) throw new Error('Error al crear el sector');
    } catch (error) {
      console.error('Error en crearSector:', error);
    }
  }

  async eliminarSector(id_sector: number): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/${id_sector}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar el sector');
    } catch (error) {
      console.error('Error en eliminarSector:', error);
    }
  }
  
  async obtenerSectores(): Promise<Sector[]> {
    const response = await fetch(this.apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error || 'Error al obtener sectores');
    }

    return await response.json();
  }
}
