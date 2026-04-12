import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  showNavFooter = true;

  private dashboardRoutes = ['/admin', '/doctor', '/patient'];

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.showNavFooter = !this.dashboardRoutes.some(r => event.urlAfterRedirects.startsWith(r));
    });
  }
}
