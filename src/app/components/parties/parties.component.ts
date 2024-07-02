import { Component, ViewChild } from '@angular/core';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ExcelModule, GridModule, PDFModule, DataBindingDirective } from '@progress/kendo-angular-grid';
import { SVGIconModule } from '@progress/kendo-angular-icons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { SVGIcon, plusIcon, fileExcelIcon, filePdfIcon } from '@progress/kendo-svg-icons';
import { PartyServiceService } from '../../services/party/party-service.service';
import { process } from '@progress/kendo-data-query';
import { PopupModule } from '@progress/kendo-angular-popup';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LabelModule } from '@progress/kendo-angular-label';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

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
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './parties.component.html',
  styleUrl: './parties.component.scss'
})

export class PartiesComponent {
  
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  gridData = [];
  gridView: any[] = [];
  partyId: any;
  error:string="";
  userRole$ = this.userService.userRoleId$;
  selectedFile:any; 
  selectedItem: any;
  showPopup = false;
  imageSrc: string | ArrayBuffer | null = null;
  public pdfSVG: SVGIcon = filePdfIcon;
  public excelSVG: SVGIcon = fileExcelIcon;
  public plusIcon: SVGIcon = plusIcon;

  public pageableSettings: any = {
    buttonCount: 5,
    info: true,
    type: 'numeric',
    pageSizes: [10, 20, 40, 50, 100, 'All'],
    previousNext: true
  };

  public form: FormGroup = new FormGroup({
    partyName: new FormControl(),
  });


  constructor(private dataService: PartyServiceService, private modalService: NgbModal, private userService: UserService,private snackbarService:SnackbarService) { }


  ngOnInit() {
    this.removeKendoInvalidLicance();
    this.getData();
  }


  getData() {
    this.dataService.getAllParties().subscribe(
      (response: any) => {
        this.gridData = response.body.data;
        this.gridView = this.gridData;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }


  public onFilter(value: Event): void {
    const inputValue = value;
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


  openAddModal(event: Event, content: any) {
    event.preventDefault();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
  }


  openVerifyModal(event: Event, content: any, id: number) {
    event.preventDefault();
    this.partyId = id;
    alert(id);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
  }


  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imageSrc = e.target?.result as string | ArrayBuffer;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }


  verifyParty(content: any) {
    alert(this.partyId);
    this.dataService.verifyParty(this.partyId, 1).subscribe(
      (response: any) => {
        if (response) {
          this.modalService.dismissAll(content);
        } else {
          console.log(response.body.error);
        }
      },
      (error: any) => {
        console.error('Error fetching data:', error.body.error);
      }
    );
  }


  addNewParty() {
    if (this.form.valid) {
      const fData = new FormData();
      fData.append('electionPartyName', this.form.get('partyName')?.value!);
      fData.append('image', this.selectedFile);

    this.dataService.addNewParty(fData).subscribe(
      (response: any) => {
        if (response.success) {
          this.modalService.dismissAll();
          this.getData();
          this.snackbarService.showToast(true,response.body.message);
        } else {
          this.error = response.body.error;
        }
      },
      (error: any) => {
        this.error="Some thing went wrong."
      }
    );
  } else {
    this.error = 'Please enter party name.';
  }
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
