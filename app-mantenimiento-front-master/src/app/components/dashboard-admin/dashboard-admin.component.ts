import { Component,OnInit,Input} from '@angular/core';
import { Router } from '@angular/router';
import { OrdenTrabajoService } from '../../services/orden-trabajo.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent {
  nombre: string | null = null;
  constructor(private router: Router,
    private authService:AuthService
  ) {}
  
  async ngOnInit() {
    this.nombre = this.authService.getUserName();
  }
 
  goBack() {
    this.router.navigate(['/login']);
  }

  navigateToOT() {
    this.router.navigate(['/orden-trabajo']);
  }

  navigateToSolicitud() {
    this.router.navigate(['/orden-trabajo-form']);
  }

  navigateToRegistro() {
    this.router.navigate(['/registro']);
  }

  navigateToHistorial() {
    this.router.navigate(['/historial']);
  }
  navigateToGestion() {
    this.router.navigate(['/gestion']);
  }
}


