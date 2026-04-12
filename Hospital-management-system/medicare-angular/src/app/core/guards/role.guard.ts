import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    const requiredRole: string = route.data['role'];
    const userRole = this.authService.getRole();

    if (!requiredRole || userRole === requiredRole || userRole === 'admin') {
      return true;
    }

    console.warn(`[Security] Unauthorized access attempt`);
    this.router.navigate(['/login']);
    return false;
  }
}
