import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../../core/services/appointment.service';

@Component({
  selector: 'app-my-doctor-appointments',
  standalone: false,
  templateUrl: './my-doctor-appointments.component.html',
})
export class MyDoctorAppointmentsComponent implements OnInit {
  appointments: any[] = [];
  loading = true;
  error = '';
  expandedId: string | null = null;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.appointmentService.getDoctorAppointments().subscribe({
      next: (data) => { this.appointments = data; this.loading = false; },
      error: () => { this.error = 'Failed to synchronize with clinical database'; this.loading = false; },
    });
  }

  toggleExpand(id: string): void {
    this.expandedId = this.expandedId === id ? null : id;
  }

  markCompleted(id: string): void {
    this.appointmentService.markCompleted(id).subscribe({
      next: () => {
        this.appointments = this.appointments.map(a =>
          a._id === id ? { ...a, status: 'completed' } : a
        );
      },
      error: () => alert('System Error: Failed to update status'),
    });
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
  }

  getInitial(name: string): string {
    return name ? name.charAt(0) : '?';
  }
}
