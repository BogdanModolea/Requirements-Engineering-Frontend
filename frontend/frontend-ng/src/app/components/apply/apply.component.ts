import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInfo } from '../../services/models/user-info';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {
  currentUser: UserInfo = {
    company: 'UBB',
    email: 'student@example.com',
    enabled: true,
    id: 1,
    name: 'John Doe',
    password: '',
    roles: 'USER'
  };
  internshipId!: number;
  additionalInfo: string = ''; // To store user-entered additional info

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get internship ID from route parameters
    this.internshipId = Number(this.route.snapshot.paramMap.get('id'));
  }

  submitApplication(): void {
    // Mock submission logic
    alert(
      `Application submitted for internship ID: ${this.internshipId}\nName: ${this.currentUser.name}\nEmail: ${this.currentUser.email}\nCompany: ${this.currentUser.company}\nAdditional Info: ${this.additionalInfo}`
    );
  }
}
