import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: false,
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  services = [
    {
      title: 'Appointment Management',
      desc: 'Patients can book appointments easily while doctors manage their schedules with real-time updates.',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      color: 'text-blue-400',
      bg: 'bg-blue-500/20',
      border: 'group-hover:border-blue-500/50',
    },
    {
      title: 'Role-Based Dashboards',
      desc: 'Separate dashboards for Admin, Doctors, and Patients ensure controlled access and smooth workflows.',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/20',
      border: 'group-hover:border-emerald-500/50',
    },
    {
      title: 'Patient Management',
      desc: 'Admins can add, deactivate, and restore patients while maintaining complete records securely.',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
      color: 'text-purple-400',
      bg: 'bg-purple-500/20',
      border: 'group-hover:border-purple-500/50',
    },
    {
      title: 'Doctor Management',
      desc: 'Comprehensive tools to manage medical staff, credentials, and availability without data loss.',
      icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/20',
      border: 'group-hover:border-cyan-500/50',
    },
    {
      title: 'Medical Records',
      desc: 'Secure EMR storage linked directly to appointments, facilitating fast and accurate clinical decisions.',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      color: 'text-rose-400',
      bg: 'bg-rose-500/20',
      border: 'group-hover:border-rose-500/50',
    },
    {
      title: 'Secure Authentication',
      desc: 'Advanced JWT encryption and protected routes ensure that sensitive medical data stays private.',
      icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      color: 'text-amber-400',
      bg: 'bg-amber-500/20',
      border: 'group-hover:border-amber-500/50',
    },
  ];
}
