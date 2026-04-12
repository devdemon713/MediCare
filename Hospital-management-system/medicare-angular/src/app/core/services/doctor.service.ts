import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private apiUrl = `${environment.apiUrl}/doctors`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getInactive(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/inactive`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, data);
  }

  deactivate(userId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/deactivate`, {});
  }

  restore(userId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/restore`, {});
  }
}
