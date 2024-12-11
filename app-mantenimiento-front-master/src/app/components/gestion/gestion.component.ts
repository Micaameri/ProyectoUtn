import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.css',
})
export class GestionComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/dashboard-admin']);
  }

  navigateToActivos() {
    this.router.navigate(['/gestion-activos']);
  }
  navigateToEdificios() {
    this.router.navigate(['/gestion-edificio']); 
  }

  navigateToSector() {
    this.router.navigate(['/gestion-sector']);
  }
  navigateToPiso() {
    this.router.navigate(['/gestion-piso']);
  }
  navigateToUbicacion() {
    this.router.navigate(['/gestion-ubicaciones']);
  }
  navigateToUsuario() {
    this.router.navigate(['/gestion-usuarios']);
  }

}