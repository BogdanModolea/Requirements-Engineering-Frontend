import { Component, OnInit } from '@angular/core';
import { Internship } from '../../services/models/internship';
import { UserInfo } from '../../services/models/user-info';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-internships',
  templateUrl: './internships.component.html',
  styleUrls: ['./internships.component.scss']
})
export class InternshipsComponent implements OnInit {
  internships: Internship[] = [];
  currentUser: UserInfo | null = null; // Current logged-in user
  loading: boolean = false;

  technologies: string[] = [
    'JAVA',
    'PYTHON',
    'CPP',
    'CS',
    'ANGULAR',
    'REACT',
    'VUEJS'
  ];

  filterCriteria = {
    paid: null as boolean | null,
    open: null as boolean | null,
    technology: ''
  };

  canApplyCache: { [key: number]: boolean } = {};

  constructor(public router: Router, private http: HttpClient) {}

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
      Authorization: `Bearer ${token}`
    });

    this.http.get<UserInfo>('http://localhost:8080/api/user/getUserInfoByToken', { headers }).subscribe({
      next: (user) => {
        this.currentUser = user;
        this.fetchInternships();
      },
      error: (error) => {
        console.error('Error fetching current user:', error);
      }
    });
  }

  fetchInternships(): void {
    if (!this.currentUser) {
      console.error('No current user found');
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

    let apiUrl = 'http://localhost:8080/api/internship/listInternships';

    // Build the API URL based on the user type and filters
    if (!this.isStudent()) {
      const params = new URLSearchParams();

      // Company-specific internships
      if (this.currentUser.company) {
        params.append('company', this.currentUser.company);
      }

      // Apply filters for company users
      if (this.filterCriteria.paid !== null) {
        params.append('paid', this.filterCriteria.paid.toString());
      }
      if (this.filterCriteria.open !== null) {
        params.append('open', this.filterCriteria.open.toString());
      }
      if (this.filterCriteria.technology) {
        params.append('technology', this.filterCriteria.technology);
      }

      apiUrl = `http://localhost:8080/api/internship/filter?${params.toString()}`;
    } else if (this.filterCriteria.paid !== null || this.filterCriteria.open !== null || this.filterCriteria.technology) {
      // Apply filters for students
      const params = new URLSearchParams();
      if (this.filterCriteria.paid !== null) {
        params.append('paid', this.filterCriteria.paid.toString());
      }
      if (this.filterCriteria.open !== null) {
        params.append('open', this.filterCriteria.open.toString());
      }
      if (this.filterCriteria.technology) {
        params.append('technology', this.filterCriteria.technology);
      }
      apiUrl = `http://localhost:8080/api/internship/filter?${params.toString()}`;
    }

    this.http.get<Internship[]>(apiUrl, { headers }).subscribe({
      next: (data) => {
        this.internships = data;
        this.loading = false;
        this.checkCanApplyForAll();
      },
      error: (error) => {
        console.error('Error fetching internships:', error);
        this.loading = false;
      }
    });
  }

  isPaid(paid?: boolean): string {
    return paid ? 'Yes' : 'No';
  }

  isOpen(open?: boolean): string {
    return open ? 'Open' : 'Closed';
  }

  hasStarted(startDate?: string): boolean {
    if (!startDate) return false;
    const today = new Date();
    return new Date(startDate) >= today;
  }

  isStudent(): boolean {
    return this.currentUser?.company === 'UBB';
  }

  applyForInternship(internshipId: number): void {
    if (internshipId === undefined || internshipId < 0) {
      console.error('Invalid internship ID');
      return;
    }
    this.router.navigate(['/apply', internshipId]);
  }

  viewApplications(internshipId: number): void {
    if (internshipId) {
      this.router.navigate([`/applications/${internshipId}`]);
    } else {
      console.error('Invalid internship ID');
    }
  }

  resetFilters(): void {
    this.filterCriteria = {
      paid: null,
      open: null,
      technology: ''
    };
    this.fetchInternships();
  }

  applyFilters(): void {
    this.fetchInternships();
  }

  checkCanApplyForAll(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.internships.forEach((internship) => {
      if (internship.id !== undefined) {
        this.http
          .get<boolean>(`http://localhost:8080/api/applications/canApply/${internship.id}`, { headers })
          .subscribe({
            next: (canApply) => {
              this.canApplyCache[internship.id!] = canApply;
            },
            error: (error) => {
              console.error(`Error checking canApply for internship ${internship.id}:`, error);
              this.canApplyCache[internship.id!] = false;
            },
          });
      }
    });
  }

  canApply(internshipId: number): boolean {
    return this.canApplyCache[internshipId] ?? false;
  }
}
