import { Component, ViewChild } from '@angular/core';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ExcelModule, GridModule, PDFModule, DataBindingDirective } from '@progress/kendo-angular-grid';
import { SVGIconModule } from '@progress/kendo-angular-icons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { SVGIcon, plusIcon,fileExcelIcon, filePdfIcon } from '@progress/kendo-svg-icons';
import { PartyServiceService } from '../../services/Party Services/party-service.service';
import { process } from '@progress/kendo-data-query';
import { PopupModule } from '@progress/kendo-angular-popup';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LabelModule } from '@progress/kendo-angular-label';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    ButtonModule,
    PopupModule,
    DialogModule,
    LabelModule,
    ReactiveFormsModule
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
  
  public form: FormGroup = new FormGroup({
    partyName: new FormControl(),
  });

  constructor(private dataService: PartyServiceService,private modalService: NgbModal) {
   }

  ngOnInit() {
    this.removeKendoInvalidLicance();
    this.getData();
    
  }
  
  getData() {
    this.dataService.getAllParties().subscribe(
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

  showPopup = false;
  imageSrc: string | ArrayBuffer | null = null;

  openAddModal(event: Event, content: any) {
    event.preventDefault();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
  }

  openVerifyModal(event: Event, content: any,id:number) {
    event.preventDefault();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imageSrc = e.target?.result as string | ArrayBuffer;
      };
      reader.readAsDataURL(file);
    }
  }

  verifyParty(){
    this.dataService.deleteParty(3,1).subscribe(
      (response:any) => {
        if(response){
          console.log(response.body.message);
        }else{
          console.log(response.body.error);
        }
      },
      (error:any) => {
        console.error('Error fetching data:', error.body.error);
      }
    );
  }
}
