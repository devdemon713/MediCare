import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../../core/services/patient.service';

@Component({
  selector: 'app-view-patients',
  standalone: false,
  templateUrl: './view-patients.component.html',
})
export class ViewPatientsComponent implements OnInit {
  patients: any[] = [];
  filteredPatients: any[] = [];
  loading = true;
  viewMode = 'table';
  search = '';

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.patientService.getAll().subscribe({
      next: (data) => {
        this.patients = data;
        this.filteredPatients = data;
        this.loading = false;
      },
      error: () => { this.loading = false; },
    });
  }

  onSearch(): void {
    this.filteredPatients = this.patients.filter(p =>
      p.userId?.name?.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  deactivate(id: string): void {
    if (!confirm('Deactivate this patient record?')) return;
    this.patientService.deactivate(id).subscribe({
      next: () => {
        this.patients = this.patients.filter(p => p._id !== id);
        this.filteredPatients = this.filteredPatients.filter(p => p._id !== id);
      },
      error: () => alert('Failed to deactivate patient'),
    });
  }
}
