import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserInfo } from '../services/models/user-info';

@Component({
  selector: 'app-profile',
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
                <button class="btn btn-link nav-link" (click)="router.navigate(['/profile'])">My Profile</button>
              </li>
              <li class="nav-item">
                <button
                  class="btn btn-link nav-link"
                  (click)="router.navigate(['/my-applications'])"
                >
                  My Applications
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <!-- Profile Content -->
      <div class="container mt-5">
        <h1 class="display-4">My Profile</h1>
        <ng-container *ngIf="currentUser; else loading">
          <p><strong>Name:</strong> {{ currentUser.fullName }}</p>
          <p><strong>Email:</strong> {{ currentUser.email }}</p>
          <p><strong>Github:</strong> {{ currentUser.githubUrl }}</p>
          <p><strong>Resume:</strong> {{ currentUser.resumeUrl }}</p>
          <button
            class="btn btn-primary mt-3"
            (click)="editProfile(currentUser.id)"
          >
            Edit Profile
          </button>
        </ng-container>
        <ng-template #loading>
          <p>Loading...</p>
        </ng-template>
      </div>
    </div>
  `,
})
export class ProfileComponent implements OnInit {
  currentUser: UserInfo | null = null;

  constructor(private http: HttpClient, public router: Router) {}

  ngOnInit(): void {
    this.fetchUser();
  }

  fetchUser(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get<UserInfo>('http://localhost:8080/api/user/getUserInfoByToken', {
        headers,
      })
      .subscribe({
        next: (data) => {
          console.log('User data:', data);
          this.currentUser = data;
        },
        error: (error) => {
          console.error('Error fetching user data:', error);
        },
      });
  }

  editProfile(userId: number | undefined): void {
    if (!userId) {
      console.error('Invalid user ID');
      return;
    }
    this.router.navigate(['/edit-profile', userId]);
  }
}
