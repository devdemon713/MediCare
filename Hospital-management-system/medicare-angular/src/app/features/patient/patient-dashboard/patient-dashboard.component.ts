import { Component } from '@angular/core';

@Component({
  selector: 'app-patient-dashboard',
  standalone: false,
  templateUrl: './patient-dashboard.component.html',
})
export class PatientDashboardComponent {
  view = 'book';

  navItems = [
    { id: 'book', label: 'New Appointment', icon: '➕' },
    { id: 'appointments', label: 'My Schedule', icon: '📅' },
    { id: 'records', label: 'Health Vault', icon: '📑' },
  ];
}
