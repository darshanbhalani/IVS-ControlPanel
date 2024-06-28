import { Component } from '@angular/core';
import { CircularCounterComponent } from '../circular-counter/circular-counter.component';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CircularCounterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  ngOnInit(): void {
    this.createLineChart();
  }

  createLineChart() {
    const ctx = document.getElementById('myLineChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015',
          '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005',
          '2004', '2003', '2002', '2001', '2000', '1999', '1998', '1997', '1996', '1995'
        ],
        datasets: [
          {
            label: 'Total',
            data: [
              970000000, 900000000, 860000000, 820000000, 780000000, 760000000, 730000000, 700000000,
              688500000, 639800860, 610000000, 580000000, 550000000, 520000000, 500000000, 480000000,
              460000000, 440000000, 420000000, 400000000, 380000000, 360000000, 340000000, 320000000,
              300000000, 280000000, 260000000, 240000000, 220000000, 200000000
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Male',
            data: [
              470000000, 450000000, 430000000, 410000000, 390000000, 380000000, 365000000, 350000000,
              344250000, 319900430, 305000000, 290000000, 275000000, 260000000, 250000000, 240000000,
              230000000, 220000000, 210000000, 200000000, 190000000, 180000000, 170000000, 160000000,
              150000000, 140000000, 130000000, 120000000, 110000000, 100000000
            ],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            hidden: true
          },
          {
            label: 'Female',
            data: [
              450000000, 420000000, 400000000, 380000000, 360000000, 350000000, 340000000, 320000000,
              310000000, 289900430, 275000000, 260000000, 245000000, 230000000, 220000000, 210000000,
              200000000, 190000000, 180000000, 170000000, 160000000, 150000000, 140000000, 130000000,
              120000000, 110000000, 100000000, 90000000, 80000000, 70000000
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            hidden: true
          },
          {
            label: 'Other',
            data: [
              5000000, 3000000, 3000000, 3000000, 3000000, 3000000, 2500000, 3000000,
              3350000, 3000000, 3000000, 3000000, 3000000, 3000000, 3000000, 3000000,
              3000000, 3000000, 3000000, 3000000, 3000000, 3000000, 3000000, 3000000,
              3000000, 3000000, 3000000, 3000000, 3000000, 3000000
            ],
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            hidden: true
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
