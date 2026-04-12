import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../../core/services/doctor.service';

@Component({
  selector: 'app-view-doctors',
  standalone: false,
  templateUrl: './view-doctors.component.html',
})
export class ViewDoctorsComponent implements OnInit {
  doctors: any[] = [];
  filteredDoctors: any[] = [];
  loading = true;
  viewMode = 'table';
  search = '';

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.fetchDoctors();
  }

  fetchDoctors(): void {
    this.doctorService.getAll().subscribe({
      next: (data) => {
        this.doctors = data;
        this.filteredDoctors = data;
        this.loading = false;
      },
      error: () => { this.loading = false; },
    });
  }

  onSearch(): void {
    this.filteredDoctors = this.doctors.filter(d =>
      d.userId?.name?.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  deactivate(userId: string): void {
    if (!confirm('Deactivate this doctor?')) return;
    this.doctorService.deactivate(userId).subscribe({
      next: () => {
        this.doctors = this.doctors.filter(d => d.userId._id !== userId);
        this.filteredDoctors = this.filteredDoctors.filter(d => d.userId._id !== userId);
      },
      error: () => alert('Failed to deactivate doctor'),
    });
  }
}
