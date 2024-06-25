import { STRING_TYPE } from '@angular/compiler';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { SVGIcon, SVGIconModule } from '@progress/kendo-angular-icons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { fileExcelIcon, filePdfIcon } from '@progress/kendo-svg-icons';
import { StateServiceService } from '../../services/General Services/state-service.service';
declare var FusionCharts: any;
interface DataSource {
  chart: {
    caption: string;
    theme: string;
    formatNumberScale: string;
    numberSuffix: string;
    entityFillHoverColor: string;
    showLabels: string;
    showTooltip: string;
  };
  colorrange?: {
    gradient: string;
    color: Array<{
      minvalue: string;
      maxvalue: string;
      code: string;
    }>;
  };
  data: Array<{
    id: string;
    value: number;
    showLabel: string;
  }>;
}
@Component({
  selector: 'app-state-assembly',
  standalone: true,
  imports: [
    DropDownsModule,
    GridModule,
    InputsModule,
    SVGIconModule,
    ExcelModule,
    PDFModule,
    ButtonModule
  ],
  templateUrl: './state-assembly.component.html',
  styleUrl: './state-assembly.component.scss'
})

export class StateAssemblyComponent {
  gridData = [];
  stateList:any = [];
  public pdfSVG: SVGIcon = filePdfIcon;
  public excelSVG: SVGIcon = fileExcelIcon;
  scrollable: 'none' | 'scrollable' | 'virtual' = 'scrollable';
  dataSources: { [key: string]: DataSource };

  public pageableSettings: any = {
    buttonCount: 5,
    info: true,
    type: 'numeric',
    pageSizes: [10, 20, 40, 50, 100, 'All'],
    previousNext: true
  };




  constructor(private dataService: StateServiceService) {
  
    this.dataSources = {
      india: {
        chart: {
          caption: "Map of India",
          theme: "fusion",
          formatNumberScale: "0",
          numberSuffix: "",
          entityFillHoverColor: "#FFF9C4",
          showLabels: "1",
          showTooltip: "1"
        },
        data: []
      },
      gujarat: {
        chart: {
          caption: "Districts of Gujarat",
          theme: "fusion",
          formatNumberScale: "0",
          numberSuffix: "",
          entityFillHoverColor: "#FFF9C4",
          showLabels: "1",
          showTooltip: "1"
        },
        colorrange: {
          gradient: "1",
          color: [
            {
              minvalue: "0",
              maxvalue: "50",
              code: "#7AB2B2"
            },
            {
              minvalue: "51",
              maxvalue: "100",
              code: "#4D869C"
            },
            {
              minvalue: "101",
              maxvalue: "200",
              code: "#006989"
            }
          ]
        },
        data: [
          {
            id: "IN.GU.AH",
            value: 80,
            showLabel: "1"
          },
          {
            id: "IN.GU.BK",
            value: 150,
            showLabel: "1"
          }
        ]
      },
      maharashtra: {
        chart: {
          caption: "Districts of Maharashtra",
          theme: "fusion",
          formatNumberScale: "0",
          numberSuffix: "",
          entityFillHoverColor: "#FFF9C4",
          showLabels: "1",
          showTooltip: "1"
        },
        colorrange: {
          gradient: "1",
          color: [
            {
              minvalue: "0",
              maxvalue: "50",
              code: "#FFD74D"
            },
            {
              minvalue: "51",
              maxvalue: "100",
              code: "#FB8C00"
            },
            {
              minvalue: "101",
              maxvalue: "200",
              code: "#E65100"
            }
          ]
        },
        data: [
          {
            id: "IN.MH.MU",
            value: 120,
            showLabel: "1"
          },
          {
            id: "IN.MH.PU",
            value: 90,
            showLabel: "1"
          }
        ]
      },
      karnataka: {
        chart: {
          caption: "Districts of Karnataka",
          theme: "fusion",
          formatNumberScale: "0",
          numberSuffix: "",
          entityFillHoverColor: "#FFF9C4",
          showLabels: "1",
          showTooltip: "1"
        },
        colorrange: {
          gradient: "1",
          color: [
            {
              minvalue: "0",
              maxvalue: "50",
              code: "#FFD74D"
            },
            {
              minvalue: "51",
              maxvalue: "100",
              code: "#FB8C00"
            },
            {
              minvalue: "101",
              maxvalue: "200",
              code: "#E65100"
            }
          ]
        },
        data: [
          {
            id: "IN.KA.BG",
            value: 110,
            showLabel: "1"
          },
          {
            id: "IN.KA.MY",
            value: 70,
            showLabel: "1"
          }
        ]
      }
    };
  }

  async ngOnInit() {
    this.removeKendoInvalidLicance();
    // this.getData();
    // await this.getAllAssemblies(0);
    console.log(this.stateList);
    this.renderChart('india', this.dataSources['india']);
  }

  getData() {
    this.dataService.GetAllStates().subscribe(
      (response: any) => {
        this.stateList = response.body.data.map((state: any) => ({ name: state.stateName, value: state.stateId }));
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );

  }

  renderChart(type: string, dataSource: any) {
    FusionCharts.ready(() => {
      var myChart = new FusionCharts({
        type: `maps/${type}`,
        renderAt: 'chart-container',
        width: '100%',
        height: '600',
        dataFormat: 'json',
        dataSource: dataSource
      });
      myChart.render();
    });
  }

  updateMap(event: any) {
    this.getAllAssemblies(event);
    const name = this.stateList.find((item:any) => item.value === event)?.name;
    if (name) {
      this.renderChart(name.toString().toLowerCase().trim().replace(/\s+/g, ""), this.dataSources[name.toString().toLowerCase().trim().replace(/\s+/g, "")]);
    } else {
      console.error('Selected item not found in the list.');
    }
  }

  getAllAssemblies(stateId: any) {
    this.dataService.GetAllAssemblyByState(stateId).subscribe(
      (response: any) => {
        this.gridData = response.body.data;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
   
  }

  removeKendoInvalidLicance() {
    setTimeout(() => {
      const banner = Array.from(document.querySelectorAll('div')).find((el) =>
        el.textContent?.includes('No valid license found for Kendo UI for Angular')
      );
      if (banner) banner.remove();
      const watermarkElement = document.querySelector('div[kendowatermarkoverlay]');
      if (watermarkElement) {
        watermarkElement.remove();
      } else {
        console.log('Watermark element not found.');
      }
    }, 0);
  }
}
