import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInfo } from '../services/models/user-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  template: `
    <div class="container mt-5">
      <h1 class="display-4">Edit Profile</h1>
      <ng-container *ngIf="currentUser; else loading">
        <form (ngSubmit)="updateProfile()">
          <div class="mb-3">
            <label for="githubUrl" class="form-label">Github URL</label>
            <input
              [(ngModel)]="currentUser.githubUrl"
              type="url"
              class="form-control"
              id="githubUrl"
              name="githubUrl"
              placeholder="https://github.com/your-profile"
              required
            />
          </div>
          <div class="mb-3">
            <label for="resumeUrl" class="form-label">Resume URL</label>
            <input
              [(ngModel)]="currentUser.resumeUrl"
              type="url"
              class="form-control"
              id="resumeUrl"
              name="resumeUrl"
              placeholder="https://your-resume-link.com"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Save Changes</button>
          <button type="button" class="btn btn-secondary ms-2" (click)="cancel()">Cancel</button>
        </form>
      </ng-container>
      <ng-template #loading>
        <p>Loading...</p>
      </ng-template>
    </div>
  `,
})
export class EditProfileComponent implements OnInit {
  currentUser: UserInfo | null = null;

  constructor(private http: HttpClient, private router: Router) {}

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
      .get<UserInfo>('http://localhost:8080/api/user/getUserInfoByToken', { headers })
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

  updateProfile(): void {
    if (!this.currentUser) {
      console.error('No user data available for update');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const updateUserDTO = {
      githubUrl: this.currentUser.githubUrl,
      resumeUrl: this.currentUser.resumeUrl,
    };

    this.http
      .put('http://localhost:8080/api/user/update-urls', updateUserDTO, { headers })
      .subscribe({
        next: () => {
          alert('Profile updated successfully!');
          this.router.navigate(['/profile']);
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          alert('Failed to update profile. Please try again.');
        },
      });
  }

  cancel(): void {
    this.router.navigate(['/profile']);
  }
}
