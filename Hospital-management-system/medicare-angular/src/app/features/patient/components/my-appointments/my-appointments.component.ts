import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../../core/services/appointment.service';

@Component({
  selector: 'app-my-appointments',
  standalone: false,
  templateUrl: './my-appointments.component.html',
})
export class MyAppointmentsComponent implements OnInit {
  appointments: any[] = [];
  loading = true;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.appointmentService.getMyAppointments().subscribe({
      next: (data) => { this.appointments = data; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }

  getMonth(dateStr: string): string {
    return new Date(dateStr).toLocaleString('default', { month: 'short' });
  }

  getDay(dateStr: string): number {
    return new Date(dateStr).getDate();
  }
}
