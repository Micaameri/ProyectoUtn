import { Component } from '@angular/core';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion-usuarios.component.html',
  styleUrl: './gestion-usuarios.component.css'
})
export class GestionUsuariosComponent {
  usuarios: User[] = [];


  constructor(private userService: UserService,private router:Router) {}
  goBack() {
    this.router.navigate(['/gestion']);
  }
  ngOnInit(): void {
    this.cargarUsuarios();
  }

  async cargarUsuarios(): Promise<void> {
    try {
      this.usuarios= await this.userService.obtenerUsuarios();
    } catch (error) {
      console.error('Error al cargar sectores:', error);
    }
  } 
  async eliminarUsuario(id_usuario: string) {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        await this.userService.eliminarUsuario(id_usuario);
        alert('Usuario eliminado exitosamente.');
        this.cargarUsuarios();
      } catch (error) {
        console.error('Error al eliminar ubicación:', error);
      }
    }
  }
  
}
