import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent {
  view = 'viewDoctors';

  menuItems = [
    { id: 'viewDoctors', label: 'View Doctors' },
    { id: 'createDoctor', label: 'Create Doctor' },
    { id: 'addPatient', label: 'Add Patient' },
    { id: 'viewPatients', label: 'View Patients' },
    { id: 'restorePatients', label: 'Restore Patients' },
    { id: 'restoreDoctors', label: 'Restore Doctors' },
  ];
}
