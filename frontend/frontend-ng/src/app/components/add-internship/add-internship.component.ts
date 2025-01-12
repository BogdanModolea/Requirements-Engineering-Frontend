import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-internship',
  templateUrl: './add-internship.component.html',
  styleUrls: ['./add-internship.component.scss']
})
export class AddInternshipComponent {
  internship = {
    technology: '',
    company: '',
    startDate: '',
    endDate: '',
    paid: false
  };

  constructor(private http: HttpClient, private router: Router) {}

  submitInternship(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found. Please log in.');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.post('http://localhost:8080/api/internship/saveInternship', this.internship, { headers }).subscribe({
      next: () => {
        alert('Internship added successfully!');
        this.router.navigate(['/internships']);
      },
      error: (error) => {
        console.error('Error adding internship:', error);
        alert('Failed to add internship. Please try again.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/internships']);
  }
}
