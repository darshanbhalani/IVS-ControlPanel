import { Component, ViewChild, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
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
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';


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
export class PartiesComponent implements OnDestroy {

  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;

  private toaster = inject(NgToastService);
  data$:any = this.dataService.partiesList$;
  gridData:any = this.dataService.partiesList$;
  gridView: any = [];
  partyId: any;
  partyName: any;
  filter=0;
  error: string = "";
  userRole$ = this.userService.userRoleId$;
  selectedFile: any;
  selectedItem: any;
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

  private subscriptions: Subscription[] = [];

  constructor(private dataService: PartyServiceService, private modalService: NgbModal,
     private userService: UserService, private snackbarService: SnackbarService,
     private  toster :ToastrService) { }

  ngOnInit() {
    this.removeKendoInvalidLicance();
    this.getData();
  }

  getData() {
    const dataSubscription = this.dataService.getAllParties().subscribe(
      (response: any) => {
        this.gridData = response.body.data;
        this.gridView = this.gridData;
      },
      (error: any) => {
        this.toaster.success("Error while fetching data.", "", 3000);
      }
    );
    this.subscriptions.push(dataSubscription);
  }

  public onFilter(value: Event): void {
    this.filter = (""+value).length;
    this.gridView= process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: "electionPartyName",
            operator: "contains",
            value: value,
          }
        ],
      },
    }).data;
    this.dataBinding.skip = 0;
  }

  openAddModal(event: Event, content: any) {
    event.preventDefault();
    this.form.reset();
    this.imageSrc=null;
    this.selectedFile=null;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
  }

  openEditModal(event: Event, content: any,data:any) {
    event.preventDefault();
    this.form.setValue({
      partyName: data.electionPartyName
    });
    this.partyName=data.electionPartyName;
    this.partyId=data.electionPartyId;
    this.imageSrc= 'data:image/jpeg;base64,'+data.electionPartyLogoUrl;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
  }

  openDeleteModal(event: Event, content: any,id: any, name: any) {
    event.preventDefault();
    this.partyId = id;
    this.partyName = name;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'md' });
  }

  openVerifyModal(event: Event, content: any, id: any, name: any) {
    event.preventDefault();
    this.partyId = id;
    this.partyName = name;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'md' });
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
    const verifySubscription = this.dataService.verifyParty(this.partyId).subscribe(
      (response: any) => {
        if (response) {
          this.modalService.dismissAll(content);

          this.toaster.success(response.body.message, "", 3000);

          // this.snackbarService.showToast(true, response.body.message);
          this.getData();

          this.partyId = null;
          this.partyName = null;
        } else {
          this.error = response.body.error;
        }
      },
      (error: any) => {
        this.error = "Something went wrong."
      }
    );
    this.subscriptions.push(verifySubscription);
  }

  addNewParty(content: any) {
    if (this.form.valid) {
      if (this.selectedFile != null) {
        const fData = new FormData();
        fData.append('electionPartyName', this.form.get('partyName')?.value!);
        fData.append('image', this.selectedFile);

        const addPartySubscription = this.dataService.addNewParty(fData).subscribe(
          (response: any) => {
            if (response.success) {
              this.modalService.dismissAll();
              this.toaster.success(response.body.message, "", 3000);
              this.error = "";
              this.selectedFile = null;
              this.imageSrc = null;
              this.form.reset();
            } else {
              this.error = response.body.error;
            }
          },
          (error: any) => {
            this.error = "Something went wrong."
          }
        );
        this.subscriptions.push(addPartySubscription);
      } else {
        this.error = 'Please upload party logo.';
      }
    } else {
      this.error = 'Please enter party name.';
    }
  }

  updateParty(content: any){
    if (this.form.valid) {
      const fData = new FormData();
      fData.append('electionPartyName', this.form.get('partyName')?.value!);
      fData.append('electionPartyId', this.partyId);
      if (this.selectedFile != null) {
        fData.append('image', this.selectedFile);
      }
        const addPartySubscription = this.dataService.updateParty(fData).subscribe(
          (response: any) => {
            if (response.success) {
              this.modalService.dismissAll();
              this.toaster.success(response.body.message, "", 3000);
              this.error = "";
              this.selectedFile = null;
              this.imageSrc = null;
              this.form.reset();
            } else {
              this.error = response.body.error;
            }
          },
          (error: any) => {
            this.error = "Something went wrong."
          }
        );
        this.subscriptions.push(addPartySubscription);
    } else {
      this.error = 'Please enter party name.';
    }
  }

  deleteParty(content: any){
    const verifySubscription = this.dataService.deleteParty(this.partyId).subscribe(
      (response: any) => {
        if (response) {
          this.modalService.dismissAll(content);
          this.toaster.success(response.body.message, "", 3000);
          this.partyId = null;
          this.partyName = null;
        } else {
          this.error = response.body.error;
        }
      },
      (error: any) => {
        this.error = "Something went wrong."
      }
    );
    this.subscriptions.push(verifySubscription);
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
      }
    }, 0);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
