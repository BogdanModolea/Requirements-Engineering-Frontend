import { Component, OnInit } from '@angular/core';
import { Internship } from '../../services/models/internship';

@Component({
  selector: 'app-internships',
  templateUrl: './internships.component.html',
  styleUrls: ['./internships.component.scss']
})
export class InternshipsComponent implements OnInit {
  internships: Internship[] = [];
  loading: boolean = false;

  constructor() {}

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
          startDate: '2025-02-01',
          endDate: '2025-05-01',
          paid: true,
          technology: 'JAVA'
        },
        {
          id: 2,
          startDate: '2025-03-01',
          endDate: '2025-09-01',
          paid: false,
          technology: 'PYTHON'
        },
        {
          id: 3,
          startDate: '2025-01-15',
          endDate: '2025-04-15',
          paid: true,
          technology: 'ANGULAR'
        },
        {
          id: 4,
          startDate: '2025-04-01',
          endDate: '2025-06-30',
          paid: false,
          technology: 'REACT'
        },
        {
          id: 5,
          startDate: '2025-05-01',
          endDate: '2025-08-01',
          paid: true,
          technology: 'CPP'
        },
        {
          id: 6,
          startDate: '2025-03-15',
          endDate: '2025-07-15',
          paid: false,
          technology: 'CS'
        },
        {
          id: 7,
          startDate: '2025-06-01',
          endDate: '2025-09-01',
          paid: true,
          technology: 'VUEJS'
        },
        {
          id: 8,
          startDate: '2025-07-01',
          endDate: '2025-10-01',
          paid: true,
          technology: 'JAVA'
        },
        {
          id: 9,
          startDate: '2025-08-01',
          endDate: '2025-11-01',
          paid: false,
          technology: 'PYTHON'
        }
      ];
      this.loading = false;
    }, 1000); // Simulate API delay
  }
}
