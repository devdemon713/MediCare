import { Component, OnInit } from '@angular/core';
import { MedicalRecordService } from '../../../../core/services/medical-record.service';

@Component({
  selector: 'app-my-medical-records',
  standalone: false,
  templateUrl: './my-medical-records.component.html',
})
export class MyMedicalRecordsComponent implements OnInit {
  records: any[] = [];
  loading = true;
  error = '';

  constructor(private medicalRecordService: MedicalRecordService) {}

  ngOnInit(): void {
    this.medicalRecordService.getMyRecords().subscribe({
      next: (data) => { this.records = data; this.loading = false; },
      error: () => { this.error = 'Protocol Error: Unable to sync health data'; this.loading = false; },
    });
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }

  getYear(dateStr: string): number {
    return new Date(dateStr).getFullYear();
  }
}
