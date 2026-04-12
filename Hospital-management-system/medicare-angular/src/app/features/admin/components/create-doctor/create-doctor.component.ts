import { Component } from '@angular/core';
import { DoctorService } from '../../../../core/services/doctor.service';

@Component({
  selector: 'app-create-doctor',
  standalone: false,
  templateUrl: './create-doctor.component.html',
})
export class CreateDoctorComponent {
  name = '';
  email = '';
  password = '';
  specialization = '';
  consultationFee = '';
  message = '';
  status: 'success' | 'error' | null = null;

  inputStyles = 'w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all backdrop-blur-sm';

  constructor(private doctorService: DoctorService) {}

  handleSubmit(): void {
    this.message = '';
    this.status = null;
    this.doctorService.create({ name: this.name, email: this.email, password: this.password, specialization: this.specialization, consultationFee: this.consultationFee }).subscribe({
      next: (res) => {
        this.message = res.message || 'Doctor created successfully';
        this.status = 'success';
        this.name = this.email = this.password = this.specialization = this.consultationFee = '';
      },
      error: (err) => {
        this.message = err.error?.message || 'Error creating doctor';
        this.status = 'error';
      },
    });
  }
}
