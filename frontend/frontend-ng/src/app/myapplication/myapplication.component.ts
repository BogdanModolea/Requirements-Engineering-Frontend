import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Application } from '../services/models';

@Component({
  selector: 'app-applications',
  template: `
    <div class="container mt-5">
      <h1 class="display-4">My Applications</h1>
      <div *ngIf="!applications || applications.length === 0" class="text-center">
        <p class="fs-5">No applications found.</p>
      </div>
      <div *ngIf="applications && applications.length > 0">
        <ul class="list-group">
          <li *ngFor="let application of applications" class="list-group-item">
            <strong>Internship:</strong> {{ application.internship?.technology }} Internship at {{ application.internship?.company }}
            <strong>Status:</strong> {{ application.status }}
            <strong>Applied At:</strong> {{ application.applicationDate }}
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class MyapplicationComponent implements OnInit {
  applications: Application[] | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchApplications();
  }

  fetchApplications(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<Application[]>('http://localhost:8080/api/applications/user', { headers }).subscribe({
      next: (data) => {
        console.log('Applications:', data);
        this.applications = data;
      },
      error: (error) => {
        console.error('Error fetching applications:', error);
      }
    });
  }
}
