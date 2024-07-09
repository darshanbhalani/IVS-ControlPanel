import { Component } from '@angular/core';
import { CircularCounterComponent } from '../circular-counter/circular-counter.component';
import { Chart } from 'chart.js/auto';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CircularCounterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  totalStates = 0;
  totalDistricts = 0;
  totalAssemblies = 0;
  totalTypesOfElections = 0;
  chartLables=[];
  chartMale=[];
  chartFemale=[];
  chartOther=[];
  chartTotal=[];
  voters:any=[];
  iVotes:any=[];


  constructor(private dashboardService: DashboardService){}

  async ngOnInit() {
    await this.getData();
  }

  async getData(){
    const dataSubscription = this.dashboardService.getDashboardData().subscribe(
      async (response: any) => {
        this.totalStates = response.body.data.counts.totalStates;
        this.totalDistricts = response.body.data.counts.totalDistricts;
        this.totalAssemblies = response.body.data.counts.totalAssemblies;
        this.totalTypesOfElections = 1;
        this.chartLables = response.body.data.yearWiseVoters.map((item:any)=> item.year);
        this.chartMale = response.body.data.yearWiseVoters.map((item:any)=> item.male);
        this.chartFemale = response.body.data.yearWiseVoters.map((item:any)=> item.female);
        this.chartOther = response.body.data.yearWiseVoters.map((item:any)=> item.other);
        this.chartTotal = response.body.data.yearWiseVoters.map((item:any)=> item.total);
        this.voters.push(response.body.data.genderWiseVoters.total);
        this.voters.push(response.body.data.genderWiseVoters.male);
        this.voters.push(response.body.data.genderWiseVoters.female);
        this.voters.push(response.body.data.genderWiseVoters.other);
        this.iVotes.push(response.body.data.iVotes.total);
        this.iVotes.push(response.body.data.iVotes.male);
        this.iVotes.push(response.body.data.iVotes.female);
        this.iVotes.push(response.body.data.iVotes.other);
      
        this.createLineChart();
        this.createDonutChart();},
      (error: any) => {
        // this.snackbarService.showToast(false, "Error fetching data.");
      }
    );
    // this.subscriptions.push(dataSubscription);
  }

  createLineChart() {
    const ctx = document.getElementById('myLineChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.chartLables,
        datasets: [
          {
            label: 'Total',
            data: this.chartTotal,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Male',
            data: this.chartMale,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            hidden: true
          },
          {
            label: 'Female',
            data: this.chartFemale,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            hidden: true
          },
          {
            label: 'Other',
            data: this.chartOther,
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

  createDonutChart() {
    const ctx1 = document.getElementById('myDonutChart') as HTMLCanvasElement;
    new Chart(ctx1, {
      type: 'doughnut',
      data: {
        labels: ['Total', 'Male', 'Female', 'Other'],
        datasets: [{
          data: this.iVotes,
          backgroundColor: [
            'rgba(75, 192, 192, 0.8)',  // Total
            'rgba(54, 162, 235, 0.8)',  // Male
            'rgba(255, 99, 132, 0.8)',  // Female
            'rgba(153, 102, 255, 0.8)'  // Other
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',  // Total
            'rgba(54, 162, 235, 1)',  // Male
            'rgba(255, 99, 132, 1)',  // Female
            'rgba(153, 102, 255, 1)'  // Other
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.raw !== null) {
                  label += new Intl.NumberFormat().format(context.raw as number);
                }
                return label;
              }
            }
          }
        }
      }
    });
  }
}
