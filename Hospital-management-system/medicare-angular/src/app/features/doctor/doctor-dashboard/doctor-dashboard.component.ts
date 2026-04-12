import { Component } from '@angular/core';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: false,
  templateUrl: './doctor-dashboard.component.html',
})
export class DoctorDashboardComponent {
  view = 'appointments';

  tabs = [
    { id: 'appointments', label: 'Patient Queue', icon: '📋' },
    { id: 'schedule', label: 'My Schedule', icon: '🗓️' },
    { id: 'analytics', label: 'Performance', icon: '📈' },
  ];
}
