import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiveElectionService {
  private hubConnection: signalR.HubConnection;
  private data = new BehaviorSubject<any>(false);
  data$ = this.data.asObservable();
  private chartData = new BehaviorSubject<any>(false);
  chartData$ = this.chartData.asObservable();

  // Hidden state for datasets
  private datasetHidden = new BehaviorSubject<boolean[]>([]);
  datasetHidden$ = this.datasetHidden.asObservable();
   initialHiddenState = [false, false, false]; 
  test=this.initialHiddenState;
  timeList = [
    "08:00", "08:05", "08:10", "08:15", "08:20", "08:25", "08:30", "08:35", "08:40", "08:45", "08:50", "08:55",
    "09:00", "09:05", "09:10", "09:15", "09:20", "09:25", "09:30", "09:35", "09:40", "09:45", "09:50", "09:55",
    "10:00", "10:05", "10:10", "10:15", "10:20", "10:25", "10:30", "10:35", "10:40", "10:45", "10:50", "10:55",
    "11:00", "11:05", "11:10", "11:15", "11:20", "11:25", "11:30", "11:35", "11:40", "11:45", "11:50", "11:55",
    "12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30", "12:35", "12:40", "12:45", "12:50", "12:55",
    "13:00", "13:05", "13:10", "13:15", "13:20", "13:25", "13:30", "13:35", "13:40", "13:45", "13:50", "13:55",
    "14:00", "14:05", "14:10", "14:15", "14:20", "14:25", "14:30", "14:35", "14:40", "14:45", "14:50", "14:55",
    "15:00", "15:05", "15:10", "15:15", "15:20", "15:25", "15:30", "15:35", "15:40", "15:45", "15:50", "15:55",
    "16:00", "16:05", "16:10", "16:15", "16:20", "16:25", "16:30", "16:35", "16:40", "16:45", "16:50", "16:55",
    "17:00", "17:05", "17:10", "17:15", "17:20", "17:25", "17:30", "17:35", "17:40", "17:45", "17:50", "17:55",
    "18:00", "18:05", "18:10", "18:15", "18:20", "18:25", "18:30", "18:35", "18:40", "18:45", "18:50", "18:55",
  ];

  constructor(private http: HttpClient, private userService: UserService) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.hubUrl)
      .build();

    this.hubConnection.start()
      .then(() => console.log("Connection started..."))
      .catch(err => console.error(err.toString()));

    this.hubConnection.on('ABCD', (response: any) => {
      this.data.next(response);
      console.log(response);

      this.datasetHidden.next(this.test);

      const chartData = {
        labels: this.timeList,
        datasets: [
          {
            label: 'Male',
            data: response.map((d: any) => d.male),
            borderColor: 'blue',
            backgroundColor: 'rgba(54, 182, 235, 0.5)',
            fill: 'origin',
            pointRadius: 1,
            pointHoverRadius: 5,
            borderWidth: 0.5,
            hidden: this.test[0]
          },
          {
            label: 'Female',
            data: response.map((d: any) => d.female),
            borderColor: 'pink',
            backgroundColor: 'rgba(255, 99, 132,0.5)',
            fill: 'origin',
            pointRadius: 1,
            pointHoverRadius: 5,
            borderWidth: 0.5,
            hidden: this.test[1]
          },
          {
            label: 'Other',
            data: response.map((d: any) => d.other),
            borderColor: 'green',
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
            fill: 'origin',
            pointRadius: 1,
            pointHoverRadius: 5,
            borderWidth: 0.5,
            hidden:  this.test[2]
          }
        ]
      };

      this.chartData.next(chartData);
    });
  }

  toggleDatasetVisibility(i1:any,i2:any,i3:any) {
    var temp=[]
    temp.push(i1 ? !this.test[0]:this.test[0]);
    temp.push(i2 ? !this.test[1]:this.test[1]);
    temp.push(i3 ? !this.test[2]:this.test[2]);
    console.log(this.test);
    this.test=temp;
    console.log(this.test);
    this.datasetHidden.next(temp);
  }
}
