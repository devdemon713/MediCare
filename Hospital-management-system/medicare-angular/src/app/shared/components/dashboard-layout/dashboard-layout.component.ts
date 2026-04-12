import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  standalone: false,
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent {
  @Input() title = '';
}
