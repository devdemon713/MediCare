import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

// Core
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

// Shared Components
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { DashboardLayoutComponent } from './shared/components/dashboard-layout/dashboard-layout.component';

// Public Pages
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';

// Admin Feature
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { ViewDoctorsComponent } from './features/admin/components/view-doctors/view-doctors.component';
import { CreateDoctorComponent } from './features/admin/components/create-doctor/create-doctor.component';
import { AddPatientComponent } from './features/admin/components/add-patient/add-patient.component';
import { ViewPatientsComponent } from './features/admin/components/view-patients/view-patients.component';
import { RestoreDoctorsComponent } from './features/admin/components/restore-doctors/restore-doctors.component';
import { RestorePatientComponent } from './features/admin/components/restore-patient/restore-patient.component';

// Doctor Feature
import { DoctorDashboardComponent } from './features/doctor/doctor-dashboard/doctor-dashboard.component';
import { MyDoctorAppointmentsComponent } from './features/doctor/components/my-doctor-appointments/my-doctor-appointments.component';
import { AddMedicalRecordComponent } from './features/doctor/components/add-medical-record/add-medical-record.component';

// Patient Feature
import { PatientDashboardComponent } from './features/patient/patient-dashboard/patient-dashboard.component';
import { BookAppointmentComponent } from './features/patient/components/book-appointment/book-appointment.component';
import { MyAppointmentsComponent } from './features/patient/components/my-appointments/my-appointments.component';
import { MyMedicalRecordsComponent } from './features/patient/components/my-medical-records/my-medical-records.component';

@NgModule({
  declarations: [
    App,
    // Shared
    NavbarComponent,
    FooterComponent,
    DashboardLayoutComponent,
    // Pages
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    ContactComponent,
    LoginComponent,
    // Admin
    AdminDashboardComponent,
    ViewDoctorsComponent,
    CreateDoctorComponent,
    AddPatientComponent,
    ViewPatientsComponent,
    RestoreDoctorsComponent,
    RestorePatientComponent,
    // Doctor
    DoctorDashboardComponent,
    MyDoctorAppointmentsComponent,
    AddMedicalRecordComponent,
    // Patient
    PatientDashboardComponent,
    BookAppointmentComponent,
    MyAppointmentsComponent,
    MyMedicalRecordsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [App]
})
export class AppModule { }
