import { Injectable } from '@angular/core';
import { OrdenTrabajo } from '../interfaces/orden-trabajo';
import { OrdenTrabajoBackend } from '../interfaces/orden-trabajo-backend';

@Injectable({
  providedIn: 'root'
})
export class OrdenTrabajoService {
  private apiUrl = 'http://localhost:3000/api';
  constructor() { }

  async crearOrdenTrabajo(orden: OrdenTrabajo): Promise<OrdenTrabajo> {
    const response = await fetch(`${this.apiUrl}/orden-trabajo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orden),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Orden de trabajo creada:', result);
      alert(`Orden de trabajo creada con ID: ${result.id}`);
      return result; 
    } else {
      console.error('Error al crear la orden:', result);
      alert(`Error: ${result.error}`);
      throw new Error(result.error); 
    }
  }

  async obtenerOrdenesPendientes(id_usuario: number): Promise<OrdenTrabajoBackend[]> {
    const response = await fetch(`${this.apiUrl}/ordenes-pendientes/${id_usuario}`);
    if (!response.ok) throw new Error('Error al obtener órdenes pendientes');
    return await response.json() as OrdenTrabajoBackend[];
  }

  async finalizarOrdenTrabajo(id_orden: number, tiempoEmpleado: number): Promise<void> {
    const response = await fetch(`${this.apiUrl}/finalizar-orden/${id_orden}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tiempoEmpleado })
    });
    if (!response.ok) throw new Error('Error al finalizar la orden de trabajo');
  }
  
  async obtenerOrdenesTrabajoFiltradas(activo: string, operario: string, fecha: string, estado: string) {
    const params = new URLSearchParams();
    
    if (activo) params.append('activo', activo);
    if (operario) params.append('operario', operario);
    if (fecha) params.append('fecha', fecha); 
    if (estado) params.append('estado', estado); 
  
    try {
      const response = await fetch(`${this.apiUrl}/orden-trabajo-filtrada?${params.toString()}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Error al obtener las órdenes de trabajo filtradas');
        return [];
      }
    } catch (error) {
      console.error('Error en la solicitud de órdenes de trabajo filtradas:', error);
      return [];
    }
  }
  
  async obtenerOrdenesTrabajo() {
    try {
      const response = await fetch(`${this.apiUrl}/orden-trabajo-detallada`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Failed to fetch ordenes de trabajo');
      return await response.json();
    } catch (error) {
      console.error('Error fetching ordenes de trabajo:', error);
      return [];
    }
  }

  async eliminarOrden(orden_trabajo_id: number): Promise<OrdenTrabajo> {
    const response = await fetch(`${this.apiUrl}/orden-trabajo/${orden_trabajo_id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error);
    }
  
    return await response.json();
  }
  
}  
