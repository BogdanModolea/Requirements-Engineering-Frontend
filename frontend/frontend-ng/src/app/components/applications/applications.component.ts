import { Component, OnInit } from '@angular/core';
import { Application } from '../../services/models/application';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  applications: Application[] = []; // List of applications
  loading: boolean = false; // Loading state

  constructor() {}

  ngOnInit(): void {
    this.fetchApplications();
  }

  fetchApplications(): void {
    this.loading = true;

    // Placeholder data for applications
    setTimeout(() => {
      this.applications = [
        {
          id: 1,
          applicationDate: '2025-01-15',
          status: 'PENDING',
          user: {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            company: 'UBB',
            roles: 'USER',
            enabled: true
          },
          internship: {
            id: 1,
            company: 'TechCorp',
            startDate: '2025-02-01',
            endDate: '2025-05-01',
            paid: true,
            technology: 'JAVA',
            open: true
          }
        },
        {
          id: 2,
          applicationDate: '2025-01-20',
          status: 'PENDING',
          user: {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            company: 'UBB',
            roles: 'USER',
            enabled: true
          },
          internship: {
            id: 2,
            company: 'DataWorks',
            startDate: '2025-03-01',
            endDate: '2025-09-01',
            paid: false,
            technology: 'PYTHON',
            open: true
          }
        }
      ];
      this.loading = false;
    }, 1000); // Simulate API delay
  }

  // Accept an application
  acceptApplication(applicationId: number): void {
    const application = this.applications.find((app) => app.id === applicationId);
    if (application) {
      application.status = 'APPROVED';
      alert(`Application #${applicationId} has been accepted.`);
    }
  }

  // Reject an application
  rejectApplication(applicationId: number): void {
    const application = this.applications.find((app) => app.id === applicationId);
    if (application) {
      application.status = 'REJECTED';
      alert(`Application #${applicationId} has been rejected.`);
    }
  }
}
