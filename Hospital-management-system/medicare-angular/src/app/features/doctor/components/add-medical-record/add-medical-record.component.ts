import { Component, Input } from '@angular/core';
import { MedicalRecordService } from '../../../../core/services/medical-record.service';

@Component({
  selector: 'app-add-medical-record',
  standalone: false,
  templateUrl: './add-medical-record.component.html',
})
export class AddMedicalRecordComponent {
  @Input() appointmentId!: string;

  diagnosis = '';
  prescription = '';
  notes = '';
  message = '';
  status: 'success' | 'error' | null = null;

  inputStyles = 'w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all backdrop-blur-sm';

  constructor(private medicalRecordService: MedicalRecordService) {}

  handleSubmit(): void {
    this.message = '';
    this.status = null;
    this.medicalRecordService.create({ appointmentId: this.appointmentId, diagnosis: this.diagnosis, prescription: this.prescription, notes: this.notes }).subscribe({
      next: () => {
        this.message = 'Medical record synchronized successfully';
        this.status = 'success';
        this.diagnosis = this.prescription = this.notes = '';
      },
      error: () => {
        this.message = 'Protocol Error: Failed to save record';
        this.status = 'error';
      },
    });
  }
}
