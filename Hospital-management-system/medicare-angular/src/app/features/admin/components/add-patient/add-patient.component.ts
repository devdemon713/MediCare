import { Component } from '@angular/core';
import { PatientService } from '../../../../core/services/patient.service';

@Component({
  selector: 'app-add-patient',
  standalone: false,
  templateUrl: './add-patient.component.html',
})
export class AddPatientComponent {
  name = '';
  email = '';
  password = '';
  age = '';
  gender = '';
  message = '';
  status: 'success' | 'error' | null = null;

  inputStyles = 'w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all backdrop-blur-sm';

  constructor(private patientService: PatientService) {}

  handleSubmit(): void {
    this.message = '';
    this.status = null;
    this.patientService.create({ name: this.name, email: this.email, password: this.password, age: this.age, gender: this.gender }).subscribe({
      next: () => {
        this.message = 'Patient added successfully';
        this.status = 'success';
        this.name = this.email = this.password = this.age = this.gender = '';
      },
      error: (err) => {
        this.message = err.error?.message || 'Patient creation failed';
        this.status = 'error';
      },
    });
  }
}
