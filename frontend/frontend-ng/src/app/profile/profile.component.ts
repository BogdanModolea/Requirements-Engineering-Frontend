import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInfo } from '../services/models/user-info';

@Component({
  selector: 'app-profile',
  template: `
    <div class="container mt-5">
      <h1 class="display-4">My Profile</h1>
      <ng-container *ngIf="currentUser; else loading">
        <p><strong>Name:</strong> {{ currentUser.fullName }}</p>
        <p><strong>Email:</strong> {{ currentUser.email }}</p>
        <p><strong>Github:</strong> {{ currentUser.githubUrl }}</p>
        <p><strong>Resume:</strong> {{ currentUser.resumeUrl }}</p>
      </ng-container>
      <ng-template #loading>
        <p>Loading...</p>
      </ng-template>
    </div>
  `,
})
export class ProfileComponent implements OnInit {
  currentUser: UserInfo | null = null;

  constructor(private http: HttpClient) {}

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
      Authorization: `Bearer ${token}`
    });

    this.http.get<UserInfo>('http://localhost:8080/api/user/getUserInfoByToken', { headers }).subscribe({
      next: (data) => {
        console.log('User data:', data);
        this.currentUser = data;
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
  }
}
