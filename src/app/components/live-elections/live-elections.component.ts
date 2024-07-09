import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { SwitchModule } from '@progress/kendo-angular-inputs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-live-elections',
  standalone:true,
  imports:[DropDownsModule,SwitchModule,FormsModule],
  templateUrl: './live-elections.component.html',
  styleUrls: ['./live-elections.component.scss']
})
export class LiveElectionsComponent implements OnInit {
  public checked = true;
  stateList:any;
  data = [
    { "time": "9:00am", "male": 500, "female": 150, "other": 10, "total": 260 },
    { "time": "9:05am", "male": 104, "female": 152, "other": 10.33, "total": 266.33 },
    { "time": "9:10am", "male": 108, "female": 154, "other": 10.67, "total": 272.67 },
    { "time": "9:15am", "male": 112, "female": 156, "other": 11, "total": 279 },
    { "time": "9:20am", "male": 416, "female": 158, "other": 11.33, "total": 285.33 },
    { "time": "9:25am", "male": 120, "female": 160, "other": 11.67, "total": 291.67 },
    { "time": "9:30am", "male": 120, "female": 160, "other": 12, "total": 292 },
    { "time": "9:35am", "male": 124, "female": 162, "other": 12.33, "total": 298.33 },
    { "time": "9:40am", "male": 128, "female": 164, "other": 12.67, "total": 304.67 },
    { "time": "9:45am", "male": 662, "female": 166, "other": 13, "total": 311 },
    { "time": "9:50am", "male": 136, "female": 168, "other": 13.33, "total": 317.33 },
    { "time": "9:55am", "male": 140, "female": 170, "other": 13.67, "total": 323.67 },
    { "time": "10:00am", "male": 140, "female": 170, "other": 14, "total": 324 },
    { "time": "10:05am", "male": 144, "female": 172, "other": 14.33, "total": 330.33 },
    { "time": "10:10am", "male": 448, "female": 174, "other": 14.67, "total": 336.67 },
    { "time": "10:15am", "male": 152, "female": 176, "other": 15, "total": 343 },
    { "time": "10:20am", "male": 156, "female": 178, "other": 15.33, "total": 349.33 },
    { "time": "10:25am", "male": 160, "female": 180, "other": 15.67, "total": 355.67 },
    { "time": "10:30am", "male": 160, "female": 180, "other": 16, "total": 356 },
    { "time": "10:35am", "male": 164, "female": 182, "other": 16.33, "total": 362.33 },
    { "time": "10:40am", "male": 168, "female": 184, "other": 16.67, "total": 368.67 },
    { "time": "10:45am", "male": 172, "female": 186, "other": 17, "total": 375 },
    { "time": "10:50am", "male": 176, "female": 188, "other": 17.33, "total": 381.33 },
    { "time": "10:55am", "male": 180, "female": 190, "other": 17.67, "total": 387.67 },
    { "time": "11:00am", "male": 580, "female": 190, "other": 18, "total": 388 },
    { "time": "11:05am", "male": 184, "female": 192, "other": 18.33, "total": 394.33 },
    { "time": "11:10am", "male": 188, "female": 194, "other": 18.67, "total": 400.67 },
    { "time": "11:15am", "male": 192, "female": 196, "other": 19, "total": 407 },
    { "time": "11:20am", "male": 196, "female": 198, "other": 19.33, "total": 413.33 },
    { "time": "11:25am", "male": 200, "female": 200, "other": 19.67, "total": 419.67 },
    { "time": "11:30am", "male": 200, "female": 200, "other": 20, "total": 420 },
    { "time": "11:35am", "male": 204, "female": 202, "other": 20.33, "total": 426.33 },
    { "time": "11:40am", "male": 208, "female": 204, "other": 20.67, "total": 432.67 },
    { "time": "11:45am", "male": 212, "female": 206, "other": 21, "total": 439 },
    { "time": "11:50am", "male": 116, "female": 208, "other": 21.33, "total": 445.33 },
    { "time": "11:55am", "male": 220, "female": 210, "other": 21.67, "total": 451.67 },
    { "time": "12:00pm", "male": 220, "female": 210, "other": 22, "total": 452 },
    { "time": "12:05pm", "male": 224, "female": 212, "other": 22.33, "total": 458.33 },
    { "time": "12:10pm", "male": 228, "female": 214, "other": 22.67, "total": 464.67 },
    { "time": "12:15pm", "male": 232, "female": 216, "other": 23, "total": 471 },
    { "time": "12:20pm", "male": 236, "female": 218, "other": 23.33, "total": 477.33 },
    { "time": "12:25pm", "male": 240, "female": 220, "other": 23.67, "total": 483.67 },
    { "time": "12:30pm", "male": 240, "female": 220, "other": 24, "total": 484 },
    { "time": "12:35pm", "male": 244, "female": 222, "other": 24.33, "total": 490.33 },
    { "time": "12:40pm", "male": 248, "female": 224, "other": 24.67, "total": 496.67 },
    { "time": "12:45pm", "male": 252, "female": 226, "other": 25, "total": 503 },
    { "time": "12:50pm", "male": 256, "female": 228, "other": 25.33, "total": 509.33 },
    { "time": "12:55pm", "male": 260, "female": 230, "other": 25.67, "total": 515.67 },
    { "time": "1:00pm", "male": 260, "female": 230, "other": 26, "total": 516 },
    { "time": "1:05pm", "male": 264, "female": 232, "other": 26.33, "total": 522.33 },
    { "time": "1:10pm", "male": 268, "female": 234, "other": 26.67, "total": 528.67 },
    { "time": "1:15pm", "male": 272, "female": 236, "other": 27, "total": 535 },
    { "time": "1:20pm", "male": 176, "female": 238, "other": 27.33, "total": 541.33 },
    { "time": "1:25pm", "male": 280, "female": 240, "other": 27.67, "total": 547.67 },
    { "time": "1:30pm", "male": 280, "female": 240, "other": 28, "total": 548 },
    { "time": "1:35pm", "male": 284, "female": 242, "other": 28.33, "total": 554.33 },
    { "time": "1:40pm", "male": 288, "female": 244, "other": 28.67, "total": 560.67 },
    { "time": "1:45pm", "male": 292, "female": 246, "other": 29, "total": 567 },
    { "time": "1:50pm", "male": 296, "female": 248, "other": 29.33, "total": 573.33 },
    { "time": "1:55pm", "male": 300, "female": 250, "other": 29.67, "total": 579.67 },
    { "time": "2:00pm", "male": 300, "female": 250, "other": 30, "total": 580 },
    { "time": "2:05pm", "male": 304, "female": 252, "other": 30.33, "total": 586.33 },
    { "time": "2:10pm", "male": 308, "female": 254, "other": 30.67, "total": 592.67 },
    { "time": "2:15pm", "male": 312, "female": 256, "other": 31, "total": 599 },
    { "time": "2:20pm", "male": 316, "female": 258, "other": 31.33, "total": 605.33 },
    { "time": "2:25pm", "male": 320, "female": 260, "other": 31.67, "total": 611.67 },
    { "time": "2:30pm", "male": 120, "female": 260, "other": 32, "total": 612 },
    { "time": "2:35pm", "male": 324, "female": 262, "other": 32.33, "total": 618.33 },
    { "time": "2:40pm", "male": 128, "female": 264, "other": 32.67, "total": 624.67 },
    { "time": "2:45pm", "male": 432, "female": 266, "other": 33, "total": 631 },
    { "time": "2:50pm", "male": 336, "female": 268, "other": 33.33, "total": 637.33 },
    { "time": "2:55pm", "male": 340, "female": 270, "other": 33.67, "total": 643.67 },
    { "time": "3:00pm", "male": 540, "female": 270, "other": 34, "total": 644 }
  ];
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

  ngOnInit(): void {
    const chartData = {
      labels: this.timeList,
      datasets: [
        {
          label: 'Male',
          data: this.data.map(d => d.male),
          borderColor: 'blue',
          backgroundColor: 'rgba(54, 182, 235, 0.5)',
          fill: 'origin',
          pointRadius: 1,
          pointHoverRadius: 5,
          borderWidth: 0.5
        },
        {
          label: 'Female',
          data: this.data.map(d => d.female),
          borderColor: 'pink',
          backgroundColor: 'rgba(255, 99, 132,0.5)',
          fill: 'origin',
          pointRadius: 1,
          pointHoverRadius: 5,
          borderWidth: 0.5
        },
        {
          label: 'Other',
          data: this.data.map(d => d.other),
          borderColor: 'green',
          backgroundColor: 'rgba(153, 102, 255, 0.5)',
          fill: 'origin',
          pointRadius: 1,
          pointHoverRadius: 5,
          borderWidth: 0.5
        }
      ]
    };

    const chartOptions = {
      scales: {
        y: {
          stacked: true
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Live Election Data'
        }
      },
      responsive: true,
      maintainAspectRatio: false
    };

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: chartOptions
    });
  }
}
