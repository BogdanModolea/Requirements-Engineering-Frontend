import { Component, OnInit } from '@angular/core';
import { Internship } from '../../services/models/internship';
import { UserInfo } from '../../services/models/user-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-internships',
  templateUrl: './internships.component.html',
  styleUrls: ['./internships.component.scss']
})
export class InternshipsComponent implements OnInit {
  internships: Internship[] = [];
  currentUser: UserInfo; // Current logged-in user
  loading: boolean = false;

  constructor(private router: Router) {
    // Placeholder user data for testing
    this.currentUser = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      company: 'TechCorp', // Change this to 'UBB' to test student behavior
      enabled: true,
      roles: 'USER'
    };
  }

  ngOnInit(): void {
    this.fetchInternships();
  }

  fetchInternships(): void {
    this.loading = true;

    // Placeholder data to simulate internships
    setTimeout(() => {
      this.internships = [
        {
          id: 1,
          company: 'TechCorp',
          startDate: '2025-02-01',
          endDate: '2025-05-01',
          paid: true,
          open: true,
          technology: 'JAVA'
        },
        {
          id: 2,
          company: 'DataWorks',
          startDate: '2025-03-01',
          endDate: '2025-09-01',
          paid: false,
          open: true,
          technology: 'PYTHON'
        },
        {
          id: 3,
          company: 'Innovate Ltd.',
          startDate: '2025-01-15',
          endDate: '2025-04-15',
          paid: true,
          open: false,
          technology: 'ANGULAR'
        },
        {
          id: 4,
          company: 'Creative Studios',
          startDate: '2025-04-01',
          endDate: '2025-06-30',
          paid: false,
          open: true,
          technology: 'REACT'
        },
        {
          id: 5,
          company: 'TechCorp',
          startDate: '2025-06-01',
          endDate: '2025-09-30',
          paid: true,
          open: true,
          technology: 'JAVA'
        },
        {
          id: 6,
          company: 'TechCorp',
          startDate: '2025-06-01',
          endDate: '2025-09-30',
          paid: true,
          open: true,
          technology: 'JAVA'
        },
        {
          id: 7,
          company: 'TechCorp',
          startDate: '2025-06-01',
          endDate: '2025-09-30',
          paid: true,
          open: true,
          technology: 'JAVA'
        },
        {
          id: 8,
          company: 'TechCorp',
          startDate: '2025-06-01',
          endDate: '2025-09-30',
          paid: true,
          open: true,
          technology: 'JAVA'
        },
        {
          id: 9,
          company: 'TechCorp',
          startDate: '2025-06-01',
          endDate: '2025-09-30',
          paid: true,
          open: true,
          technology: 'JAVA'
        },
        {
          id: 10,
          company: 'TechCorp',
          startDate: '2025-06-01',
          endDate: '2025-09-30',
          paid: true,
          open: true,
          technology: 'JAVA'
        }

      ];
      this.loading = false;
    }, 1000); // Simulate API delay
  }

  // Safely determine if an internship is paid
  isPaid(paid?: boolean): string {
    return paid === true ? 'Yes' : 'No';
  }

  // Safely check if an internship is open
  isOpen(open?: boolean): string {
    return open === true ? 'Open' : 'Closed';
  }

  // Safely determine if an internship start date is valid
  hasStarted(startDate?: string): boolean {
    if (!startDate) {
      return false; // If startDate is undefined, return false
    }
    const today = new Date();
    return new Date(startDate) >= today;
  }

  // Check if the user is a student based on their company
  isStudent(): boolean {
    return this.currentUser.company === 'UBB';
  }

  // Navigate to the apply page
  applyForInternship(internshipId: number | undefined): void {
    if (internshipId === undefined) {
      console.error('Invalid internship ID');
      return;
    }
    this.router.navigate(['/apply', internshipId]);
  }

  // Navigate to the applications page
  viewApplications(): void {
    this.router.navigate(['/applications']);
  }
}
