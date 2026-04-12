import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
})
export class HomeComponent {
  features = [
    {
      title: 'Smart Scheduling',
      desc: 'AI-driven appointment booking that minimizes wait times and optimizes doctor availability.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/20',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    },
    {
      title: 'Unified Portal',
      desc: 'Role-specific interfaces for Admins, Doctors, and Patients with bank-grade security protocols.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/20',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    },
    {
      title: 'Secure EMR',
      desc: 'Instant access to electronic medical records while maintaining HIPAA-compliant data encryption.',
      color: 'text-purple-400',
      bg: 'bg-purple-500/20',
      icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    },
  ];
}
