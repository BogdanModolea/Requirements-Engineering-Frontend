import { Component, OnInit } from '@angular/core';
import { Application } from '../../services/models/application';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  applications: Application[] = []; // List of applications
  loading: boolean = false; // Loading state
  internshipId: number | null = null; // Internship ID from URL

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.internshipId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Internship ID:', this.internshipId); // Debugging
    if (this.internshipId) {
      this.fetchApplications();
    } else {
      console.error('No internshipId provided in the URL');
    }
  }

  fetchApplications(): void {
    if (!this.internshipId) {
      console.error('Internship ID is null, skipping API call');
      return;
    }

    this.loading = true;

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      this.loading = false;
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const apiUrl = `http://localhost:8080/api/applications/internship/${this.internshipId}`;
    console.log('API URL:', apiUrl); // Debugging

    this.http.get<Application[]>(apiUrl, { headers }).subscribe({
      next: (data) => {
        console.log('API Response:', data); // Debugging
        this.applications = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching applications:', error);
        this.loading = false;
      }
    });
  }

  // Accept an application
  acceptApplication(applicationId: number): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const apiUrl = `http://localhost:8080/api/applications/accept/${applicationId}`;
    this.http.post(apiUrl, {}, { headers }).subscribe({
      next: () => {
        const application = this.applications.find((app) => app.id === applicationId);
        if (application) {
          application.status = 'APPROVED';
          alert(`Application #${applicationId} has been accepted.`);
        }
      },
      error: (error) => {
        console.error('Error accepting application:', error);
      }
    });
  }

  // Reject an application
  rejectApplication(applicationId: number): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const apiUrl = `http://localhost:8080/api/applications/reject/${applicationId}`;
    this.http.post(apiUrl, {}, { headers }).subscribe({
      next: () => {
        const application = this.applications.find((app) => app.id === applicationId);
        if (application) {
          application.status = 'REJECTED';
          alert(`Application #${applicationId} has been rejected.`);
        }
      },
      error: (error) => {
        console.error('Error rejecting application:', error);
      }
    });
  }
}
