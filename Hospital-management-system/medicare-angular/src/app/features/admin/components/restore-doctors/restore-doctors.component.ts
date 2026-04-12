import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../../core/services/doctor.service';

@Component({
  selector: 'app-restore-doctors',
  standalone: false,
  templateUrl: './restore-doctors.component.html',
})
export class RestoreDoctorsComponent implements OnInit {
  doctors: any[] = [];
  loading = true;
  error = '';

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.doctorService.getInactive().subscribe({
      next: (data) => { this.doctors = data; this.loading = false; },
      error: () => { this.error = 'Failed to load inactive doctors'; this.loading = false; },
    });
  }

  restore(userId: string): void {
    if (!confirm('Restore this doctor\'s credentials and system access?')) return;
    this.doctorService.restore(userId).subscribe({
      next: () => { this.doctors = this.doctors.filter(d => d.userId._id !== userId); },
      error: () => alert('System Failure: Unable to restore medical profile'),
    });
  }
}
