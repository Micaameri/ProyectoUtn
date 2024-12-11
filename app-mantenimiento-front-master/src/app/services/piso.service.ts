import { Injectable } from '@angular/core';
import { Piso } from '../interfaces/piso';

@Injectable({
  providedIn: 'root'
})
export class PisoService {
  private apiUrl = 'http://localhost:3000/api'; 
  
  constructor() {}

  async crearPiso(piso: { piso: string }): Promise<Piso> {
    const response = await fetch(`${this.apiUrl}/piso`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(piso),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error);
    }

    return await response.json();
  }

  async eliminarPiso(id: number): Promise<void> {
    const response = await fetch(`${this.apiUrl}/piso/${id}`, { method: 'DELETE' });

    if (!response.ok) {
      throw new Error('Error al eliminar el piso');
    }}
      
  async obtenerPisos(): Promise<Piso[]> {
    const response = await fetch(`${this.apiUrl}/lista-pisos`);
    
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error);
    }

    return await response.json();
  }
}