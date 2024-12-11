import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  username: string = '';
  apellido: string = '';
  tipoUsuario: string = 'operario';
  password: string = '';
  email: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private userService: UserService) {}

  goBack() {
    this.router.navigate(['/dashboard-admin']);
  }

  async register() {
  
    if (!this.username || !this.apellido || !this.email || !this.password) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.email)) {
      this.errorMessage = 'Por favor, ingrese un email válido.';
      return;
    }

    
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 
    if (!passwordPattern.test(this.password)) {
      this.errorMessage = 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números.';
      return;
    }

    
    this.errorMessage = '';

    const userData = {
      nombre: this.username,
      area: this.tipoUsuario,
      contraseña: this.password,
      email: this.email,
      apellido: this.apellido
    };

    try {
      const response = await this.userService.registrarOperario(userData);
      console.log('Usuario registrado:', response);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Error al registrar. Intente nuevamente.');
    }
  }
}