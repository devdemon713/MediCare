import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../../core/services/doctor.service';
import { AppointmentService } from '../../../../core/services/appointment.service';

@Component({
  selector: 'app-book-appointment',
  standalone: false,
  templateUrl: './book-appointment.component.html',
})
export class BookAppointmentComponent implements OnInit {
  doctors: any[] = [];
  doctorId = '';
  date = '';
  message = '';
  status: 'success' | 'error' | null = null;

  inputStyles = 'w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all backdrop-blur-sm appearance-none';

  constructor(
    private doctorService: DoctorService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.doctorService.getAll().subscribe({
      next: (data) => { this.doctors = data; },
      error: (err) => console.error(err),
    });
  }

  handleSubmit(): void {
    this.message = '';
    this.status = null;
    this.appointmentService.book({ doctorId: this.doctorId, appointmentDate: this.date, timeSlot: '10:00 AM' }).subscribe({
      next: () => {
        this.message = 'Appointment secured successfully';
        this.status = 'success';
        this.doctorId = '';
        this.date = '';
      },
      error: (err) => {
        this.message = err.error?.message || 'Scheduling conflict: Failed to book';
        this.status = 'error';
      },
    });
  }
}
