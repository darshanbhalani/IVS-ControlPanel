import { Component, ViewChild } from '@angular/core';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ExcelModule, GridModule, PDFModule, DataBindingDirective } from '@progress/kendo-angular-grid';
import { SVGIconModule } from '@progress/kendo-angular-icons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { SVGIcon, plusIcon,fileExcelIcon, filePdfIcon } from '@progress/kendo-svg-icons';
import { PartyServiceService } from '../../services/Party Services/party-service.service';
import { process } from '@progress/kendo-data-query';
@Component({
  selector: 'app-parties',
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
  templateUrl: './parties.component.html',
  styleUrl: './parties.component.scss'
})
export class PartiesComponent {
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  gridData=[];
   gridView: any[]=[];
  public pageableSettings: any = {
    buttonCount: 5,
    info: true,
    type: 'numeric',
    pageSizes: [10, 20, 40, 50, 100, 'All'],
    previousNext: true
  };
  selectedItem: any;
  public pdfSVG: SVGIcon = filePdfIcon;
  public excelSVG: SVGIcon = fileExcelIcon;
  public plusIcon: SVGIcon = plusIcon;

  constructor(private dataService: PartyServiceService) {
   }

  ngOnInit() {
    this.removeKendoInvalidLicance();
    this.getData();
    
  }
  
  getData() {
    this.dataService.GetAllVerifiedParties().subscribe(
      (response:any) => {
          this.gridData=response.body.data;
          this.gridView = this.gridData;
      },
      (error:any) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  public onFilter(value: Event): void {
    const inputValue = value;
    console.error("Called...");
    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "electionPartyName",
            operator: "contains",
            value: inputValue,
          }          
        ],
      },
    }).data;

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
        console.log('Watermark removed successfully.');
      } else {
        console.log('Watermark element not found.');
      }
    }, 0); 
  }
}
