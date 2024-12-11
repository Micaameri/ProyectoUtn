import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';

  constructor() { }

  async obtenerUsuarios(): Promise<User[]> {
    const response = await fetch(`${this.apiUrl}/lista-usuarios`);
    if (!response.ok) {
      throw new Error('Error al obtener operarios');
    }
    return response.json() as Promise<User[]>;
  }

  async obtenerOperarios(): Promise<User[]> {
    try {
      const response = await fetch(`${this.apiUrl}/operarios`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Failed to fetch operarios');
      return response.json() as Promise<User[]>;
    } catch (error) {
      console.error('Error fetching operarios:', error);
      return [];
    }
  }

  async registrarOperario(userData: { nombre: string; area: string; contraseña: string; email: string; apellido: string }): Promise<{ message: string }> {
    const response = await fetch(`${this.apiUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al registrar operario');
    }

    return response.json() as Promise<{ message: string }>;
  }

  async login(credentials: { nombre: string; contraseña: string }): Promise<string> {
    const response = await fetch(`${this.apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Error al iniciar sesión');
    }

    const data = await response.json() as { token: string };
    if (data.token) {
      document.cookie = `token=${data.token}; path=/; secure; samesite=strict;`;
    }
    return data.token;
  }
  async eliminarUsuario(id_usuario: string): Promise<{ message: string }> {
    try {
      console.log(`Eliminando  con iusuariod: ${id_usuario}`); 
      const response = await fetch(`${this.apiUrl}/usuarios/${id_usuario}`, {
        method: 'DELETE',
      });
  
      const result = await response.json();
      console.log('Respuesta del servidor:', result); 
      return result;
    } catch (error) {
      console.error('Error en el servicio al eliminar el usuario:', error);
      throw error;
    }
  }
  
}

