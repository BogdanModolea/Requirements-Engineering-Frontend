import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Application } from '../services/models';
import { UserInfo } from '../services/models/user-info';

@Component({
  selector: 'app-applications',
  template: `
    <div>
      <!-- Navbar -->
      <nav
        class="navbar navbar-expand-lg navbar-light bg-light mb-4"
        *ngIf="currentUser?.company === 'UBB'"
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="/internships">InternLink</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <button class="btn btn-link nav-link" (click)="navigateToProfile()">My Profile</button>
              </li>
              <li class="nav-item">
                <button
                  class="btn btn-link nav-link"
                  (click)="navigateToApplications()"
                >
                  My Applications
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <!-- Applications Content -->
      <div class="container mt-5">
        <h1 class="display-4">My Applications</h1>
        <div *ngIf="!applications || applications.length === 0" class="text-center">
          <p class="fs-5">No applications found.</p>
        </div>
        <div *ngIf="applications && applications.length > 0">
          <ul class="list-group">
            <li *ngFor="let application of applications" class="list-group-item">
              <strong>Internship:</strong> {{ application.internship?.technology }} Internship at {{ application.internship?.company }}
              <br />
              <strong>Status:</strong> {{ application.status }}
              <br />
              <strong>Applied At:</strong> {{ application.applicationDate }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
})
export class MyapplicationComponent implements OnInit {
  applications: Application[] | null = null;
  currentUser: UserInfo | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCurrentUser();
  }

  fetchCurrentUser(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.get<UserInfo>('http://localhost:8080/api/user/getUserInfoByToken', { headers }).subscribe({
      next: (data) => {
        this.currentUser = data;
        this.fetchApplications();
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      },
    });
  }

  fetchApplications(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.get<Application[]>('http://localhost:8080/api/applications/user', { headers }).subscribe({
      next: (data) => {
        console.log('Applications:', data);
        this.applications = data;
      },
      error: (error) => {
        console.error('Error fetching applications:', error);
      },
    });
  }

  navigateToProfile(): void {
    window.location.href = '/profile';
  }

  navigateToApplications(): void {
    window.location.href = '/my-applications';
  }
}
