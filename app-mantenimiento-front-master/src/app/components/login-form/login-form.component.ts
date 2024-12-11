import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit {
  email = '';
  password = '';
  role = '';
  imageUrl = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.imageUrl = params['image'];
      this.role = params['role'];
    });
  }

  goBack() {
    this.router.navigate(['/login']);
  }



async login() {
  const credentials = { email: this.email, contraseña: this.password, role: this.role };
  const response = await this.authService.login(credentials);

  if (response && response.token) {
    this.router.navigate(this.role === 'administrativo' ? ['/dashboard-admin'] : ['/dashboard-operario']);
  } else {
    console.error('Login failed');
  }
}
}