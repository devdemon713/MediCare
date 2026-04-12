import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  role = 'patient';
  error = '';
  isLoading = false;

  roles = ['patient', 'doctor', 'admin'];

  constructor(private authService: AuthService, private router: Router) {}

  handleSubmit(): void {
    this.error = '';
    this.isLoading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        const backendRole = res.role;
        if (backendRole !== this.role) {
          this.error = `Access Denied. You are registered as ${backendRole}.`;
          this.isLoading = false;
          return;
        }
        this.authService.setSession(res.token, backendRole);
        this.router.navigate([`/${backendRole}`]);
      },
      error: (err) => {
        this.error = err.error?.message || 'Authentication failed';
        this.isLoading = false;
      },
    });
  }
}
