import { Component, ViewChild } from '@angular/core';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule, DropDownListComponent } from '@progress/kendo-angular-dropdowns';
import { DataBindingDirective, ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { SVGIcon, SVGIconModule } from '@progress/kendo-angular-icons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { fileExcelIcon, filePdfIcon } from '@progress/kendo-svg-icons';
import { process } from '@progress/kendo-data-query';
import { firstValueFrom } from 'rxjs';
import { GeneralService } from '../../../../services/general/general.service';

declare var FusionCharts: any;

interface Assembly {
  asseblyId: number;
  asseblyName: string;
  asseblyDistrict: string;
  fusionDistrictId: string;
}

interface ApiResponse {
  success: boolean;
  header: {
      requestTime: string;
      responsTime: string;
  };
  body: {
      data: Assembly[];
  };
}

interface DistrictData {
  id: string;
  value: number;
  showLabel: string;
}

interface DataSource {
  chart: {
    caption: string;
    theme: string;
    formatNumberScale: string;
    numberSuffix: string;
    entityFillHoverColor: string;
    entityHoverBorderColor:string;
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
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  @ViewChild('dropdown') dropdown!: DropDownListComponent;
  stateList: any = [];
  gridData: Assembly[] = [];
  gridView: Assembly[] = [];
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

 

  constructor(private generalService: GeneralService) {
    this.getData();
    this.dataSources = {
      'state': {
        chart: {
          caption: "",
          theme: "fusion",
          formatNumberScale: "0",
          numberSuffix: "",
          entityFillHoverColor: "#E88D67",
          entityHoverBorderColor: "#005C78",
          showLabels: "1",
          showTooltip: "1"
        },
        colorrange: {
          gradient: "0",
          color: [
            {
              minvalue: "1",
              maxvalue: "5",
              code: "#CAF4FF"
            },
            {
              minvalue: "5",
              maxvalue: "10",
              code: "#8ECDDD"
            },
            {
              minvalue: "10",
              maxvalue: "50",
              code: "#03AED2"
            }
          ]
        },
        data: []
      },
    };
  }

  ngAfterViewInit(){
    if (this.dropdown) {
      this.dropdown.defaultItem = {name:"Gujarat",value:7};
    }
  }


  async ngOnInit() {
    this.removeKendoInvalidLicance();
    await this.getAllAssemblies(7);
    this.dataSources['state'].chart.caption ="Districts of Gujarat"
    this.renderChart('gujarat', this.dataSources['state']);
  }



  getData() {
    this.generalService.getAllStates().subscribe(
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
        dataSource: dataSource,
        events: {
          entityClick: (eventObj: any, dataObj: any) => {
            this.onDistrictClick(dataObj.id);
          }
        }
      });
      myChart.render();
    });
  }


  async updateMap(event: any) {
    await this.getAllAssemblies(event.value);
    if (event.value) {
      this.dataSources['state'].chart.caption  = "Districts of " + event.name;
      this.renderChart(event.name.toString().toLowerCase().trim().replace(/\s+/g, ""), this.dataSources['state']);
    } else {
      console.error('Selected item not found in the list.');
    }
  }


  async getAllAssemblies(stateId: any) {
    try {
      const response: any = await firstValueFrom(this.generalService.getAllAssemblyByState(stateId));
      this.gridData = response.body.data;
      this.gridView = response.body.data;
      this.dataSources['state'].data = this.transformData(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  public onFilter(value: Event): void {
    const inputValue = value;
    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "asseblyName",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "asseblyDistrict",
            operator: "contains",
            value: inputValue,
          }
        ],
      },
    }).data;
    this.dataBinding.skip = 0;
  }

  
  transformData = (response: ApiResponse): DistrictData[] => {
    const districtCount: { [key: string]: number } = {};
    response.body.data.forEach((assembly) => {
      if (districtCount[assembly.fusionDistrictId]) {
        districtCount[assembly.fusionDistrictId]++;
      } else {
        districtCount[assembly.fusionDistrictId] = 1;
      }
    });
    const transformedData: DistrictData[] = Object.keys(districtCount).map((district) => ({
      id: district,
      value: districtCount[district],
      showLabel: "1"
    }));
    console.log(this.dataSources['state'].data.values);
    return transformedData;
  };


  onDistrictClick(districtId: string) {
    console.log(districtId);
    this.gridView = this.gridData.filter(assembly => assembly.fusionDistrictId.toLocaleLowerCase() === districtId);
    this.dataBinding.skip = 0; 
  }


  exportToExcel(): void {
    this.gridView = this.gridData;
    this.dataBinding.skip = 0;
  }


  exportToPDF(): void {
    this.gridView = this.gridData;
    this.dataBinding.skip = 0;
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
