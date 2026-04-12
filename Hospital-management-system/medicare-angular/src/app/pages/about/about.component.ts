import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
})
export class AboutComponent {
  offerings = [
    'Role-based dashboards for all users',
    'Secure appointment lifecycle',
    'Encrypted digital medical records',
    'Integrated staff management',
    'High-performance MERN architecture',
  ];

  values = [
    {
      title: 'Trust & Security',
      desc: 'Bank-grade JWT encryption and role-based access control to keep patient data private.',
      icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      color: 'text-blue-400',
    },
    {
      title: 'Efficiency',
      desc: 'Advanced scheduling algorithms that minimize wait times and maximize clinical throughput.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      color: 'text-emerald-400',
    },
    {
      title: 'Modern Tech',
      desc: 'Leveraging the MERN stack for a lightning-fast, scalable, and future-proof experience.',
      icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
      color: 'text-purple-400',
    },
  ];
}
