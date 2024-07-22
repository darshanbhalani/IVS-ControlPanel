import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { DropDownsModule, DropDownListComponent } from '@progress/kendo-angular-dropdowns';
import { SwitchModule, InputsModule } from '@progress/kendo-angular-inputs';
import { FormsModule } from '@angular/forms';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { SVGIconModule, SVGIcon } from '@progress/kendo-angular-icons';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { fileExcelIcon, filePdfIcon } from '@progress/kendo-svg-icons';
import { StateElectionService } from '../../../../services/stateElection/state-election.service';
import { GeneralService } from '../../../../services/general/general.service';
import { LiveElectionService } from '../../../../services/live-election/live-election.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-live-elections',
  standalone: true,
  imports: [
    DropDownsModule,
    SwitchModule,
    FormsModule,
    GridModule,
    InputsModule,
    SVGIconModule,
    ExcelModule,
    PDFModule,
    ButtonModule
  ],
  templateUrl: './live-elections.component.html',
  styleUrls: ['./live-elections.component.scss']
})
export class LiveElectionsComponent implements OnInit, OnDestroy {
  @ViewChild('dropdown1') dropdown1!: DropDownListComponent;
  @ViewChild('dropdown2') dropdown2!: DropDownListComponent;
  @ViewChild('dropdown3') dropdown3!: DropDownListComponent;

  gridData: any = [];
  gridView: any[] = [];
  chartDataSubscription!: Subscription;
  public chart: any;
  public pdfSVG: SVGIcon = filePdfIcon;
  public excelSVG: SVGIcon = fileExcelIcon;
  scrollable: 'none' | 'scrollable' | 'virtual' = 'scrollable';
  public pageableSettings: any = {
    buttonCount: 5,
    info: true,
    type: 'numeric',
    pageSizes: [10, 20, 40, 50, 100, 'All'],
    previousNext: true
  };

  public checked = true;
  timerList: any = [
    { name: "1 Min", value: 60 },
    { name: "2 Min", value: 120 },
    { name: "3 Min", value: 180 },
    { name: "4 Min", value: 240 },
    { name: "5 Min", value: 300 },
    { name: "10 Min", value: 600 }
  ];

  electionList: any = [];
  districtList: any = [];
  assemblyList: any = [];

  constructor(
    private stateElectionService: StateElectionService,
    private generalService: GeneralService,
    private liveElectionService: LiveElectionService
  ) { }

  ngOnInit(): void {
    this.removeKendoInvalidLicance();
    // this.getData();
    this.getDistricts(7);

    const chartOptions: ChartConfiguration<'line'>['options'] = {
      scales: {
        y: {
          stacked: true
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Live Election Data'
        },
        legend: {
          onClick: (e, legendItem, legend) => {
            const defaultClickHandler = Chart.defaults.plugins.legend.onClick;
            defaultClickHandler.call(legend, e, legendItem, legend);
            const chart = legend.chart;
            const datasetIndex = legendItem.datasetIndex;
            console.log(chart.data);
            chart.update();

            console.log(legendItem);
            if(legendItem.text === 'Male'){
              this.liveElectionService.toggleDatasetVisibility(true,false,false);
            }else if(legendItem.text === 'Female'){
              this.liveElectionService.toggleDatasetVisibility(false,true,false);
            }else if(legendItem.text === 'Other'){
              this.liveElectionService.toggleDatasetVisibility(false,false,true);
            }else{

            }
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      animation: false
    };

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: []
      },
      options: chartOptions
    });

    this.chartDataSubscription = this.liveElectionService.chartData$.subscribe(chartData => {
      this.chart.data = chartData;
      this.chart.update();
    });
  }

  ngOnDestroy(): void {
    if (this.chartDataSubscription) {
      this.chartDataSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() { }

  onTimerChange(event: any) { }

  getData() {
    this.stateElectionService.getAllLiveElections().subscribe((response: any) => {
      if (response.success) {
        response.body.data.map((item: any) => {
          this.electionList.push({
            name: item.stateName + ' - ' + item.electionDate.split('-')[0],
            value: item.stateElectionId,
            stateId: item.stateId
          });
        });
        this.dropdown1.defaultItem = this.electionList[0];
        alert(this.electionList[0].stateId);
        this.getDistricts(this.electionList[0].stateId);
        this.electionList = this.electionList.slice(1);
      }
    });
  }

  fetchLiveData() { }

  getDistricts(stateId: any) {
    this.generalService.getAllDistricts(stateId).subscribe((response: any) => {
      if (response.success) {
        response.body.data.map((item: any) => {
          this.districtList.push({
            name: item.districtName,
            value: item.districtId
          });
        });
      }
    });
  }

  getAssemblies(districtId: any) {
    this.generalService.getAllAssemblyByDistrict(districtId).subscribe((response: any) => {
      if (response.success) {
        response.body.data.map((item: any) => {
          this.assemblyList.push({
            name: item.asseblyName,
            value: item.asseblyId
          });
        });
      }
    });
  }

  onElectionChange(event: any) { }

  onDistrictChange(event: any) { }

  onAssemblyChange(event: any) { }

  removeKendoInvalidLicance() {
    setTimeout(() => {
      const banner = Array.from(document.querySelectorAll('div')).find((el) =>
        el.textContent?.includes('No valid license found for Kendo UI for Angular')
      );
      if (banner) banner.remove();
      const watermarkElement = document.querySelector('div[kendowatermarkoverlay]');
      if (watermarkElement) {
        watermarkElement.remove();
      }
    }, 0);
  }
}
