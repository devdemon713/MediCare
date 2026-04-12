import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../../core/services/patient.service';

@Component({
  selector: 'app-restore-patient',
  standalone: false,
  templateUrl: './restore-patient.component.html',
})
export class RestorePatientComponent implements OnInit {
  patients: any[] = [];
  loading = true;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.patientService.getInactive().subscribe({
      next: (data) => { this.patients = data; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }

  restore(id: string): void {
    this.patientService.restore(id).subscribe({
      next: () => { this.patients = this.patients.filter(p => p._id !== id); },
      error: () => alert('Failed to restore patient record'),
    });
  }
}
