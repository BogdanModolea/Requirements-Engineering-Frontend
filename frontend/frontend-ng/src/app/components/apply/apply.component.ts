import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInfo } from '../../services/models/user-info';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {
  currentUser: UserInfo | null = null; // Current logged-in user
  internshipId!: number;
  additionalInfo: string = ''; // To store user-entered additional info

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Get internship ID from route parameters
    this.internshipId = Number(this.route.snapshot.paramMap.get('id'));
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
      },
      error: (error) => {
        console.error('Error fetching current user:', error);
      }
    });
  }

  submitApplication(): void {
    if (!this.currentUser) {
      alert('User information not available. Please try again later.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found in localStorage');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const apiUrl = `http://localhost:8080/api/applications/apply?userId=${this.currentUser.id}&internshipId=${this.internshipId}`;

    this.http.post(apiUrl, { additionalInfo: this.additionalInfo }, { headers }).subscribe({
      next: () => {
        alert(`Application submitted successfully for internship ID: ${this.internshipId}`);
      },
      error: (error) => {
        console.error('Error submitting application:', error);
        alert('Failed to submit application. Please try again.');
      }
    });
  }
}
