import { Injectable } from '@angular/core';
import { ActivoTarea } from '../interfaces/activo-tarea';
@Injectable({
  providedIn: 'root'
})
export class ActivoTareaService {
  private apiUrl = 'http://localhost:3000/api';


  constructor() {}

  async crearTareaYRelacion(data: { id_activo: string; tarea: string; tipo_tarea: string }) {
    try {
        const response = await fetch(`${this.apiUrl}/activoTarea/crear-tarea-relacion`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Error al crear la tarea y relación activo-tarea');
        }

        return await response.json();
    } catch (error) {
        console.error('Error en crearTareaYRelacion:', error);
        throw error;
    }
}


  async obtenerTareas(id_activo: string, tipo_tarea: string): Promise<ActivoTarea[]> {
    const url = `${this.apiUrl}/activoTareas/${id_activo}?tipo_tarea=${tipo_tarea}`;
    console.log('Solicitud al backend:', url);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('No se pudieron obtener las tareas');
      }
      const data = await response.json();
      console.log('Respuesta del backend:', data);
      return data;
    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw error;
    }
  }
}  