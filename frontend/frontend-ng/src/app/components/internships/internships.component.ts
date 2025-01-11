import { Component, OnInit } from '@angular/core';
import { Internship } from '../../services/models/internship';
import { UserInfo } from '../../services/models/user-info'; // Import UserInfo model
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
      company: 'UBB',
      enabled: true,
      roles: 'STUDENT'
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
        }
      ];
      this.loading = false;
    }, 1000); // Simulate API delay
  }

  // Safely determine if an internship is paid
  isPaid(paid?: boolean): string {
    return paid === true ? 'Yes' : 'No'; // Explicitly check for true
  }

  // Safely check if an internship is open
  isOpen(open?: boolean): string {
    return open === true ? 'Open' : 'Closed'; // Explicitly check for true
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
    return this.currentUser.company === 'UBB'; // Return true if user is from UBB
  }

  // Navigate to the apply page
  applyForInternship(internshipId: number | undefined): void {
    if (internshipId === undefined) {
      console.error('Invalid internship ID'); // Handle error as needed
      return;
    }
    this.router.navigate(['/apply', internshipId]); // Navigate to the apply component with the valid internship ID
  }
}
