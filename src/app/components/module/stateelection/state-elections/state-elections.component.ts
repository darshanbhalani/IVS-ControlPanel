import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { SVGIconModule } from '@progress/kendo-angular-icons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { SVGIcon,plusIcon, filePdfIcon, fileExcelIcon } from "@progress/kendo-svg-icons";
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, RequiredValidator, Validators } from "@angular/forms";
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { GeneralService } from '../../services/general/general.service';
import { StateElectionService } from '../../services/stateElection/state-election.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-state-elections',
  standalone: true,
  imports: [
    GridModule,
    InputsModule,
    SVGIconModule,
    ExcelModule,
    PDFModule,
    ButtonModule,
    DropDownsModule,
    LabelModule,
    FormsModule,
    ReactiveFormsModule,
    DateInputsModule
  ],
  templateUrl: './state-elections.component.html',
  styleUrl: './state-elections.component.scss'
})
export class StateElectionsComponent {

  gridView=[];
  gridData=[];
  stateList:any=[];
  error:any=null;
  private subscriptions: Subscription[] = [];
  public pageableSettings: any = {
    buttonCount: 5,
    info: true,
    type: 'numeric',
    pageSizes: [10, 20, 40, 50, 100, 'All'],
    previousNext: true
  };
  public pdfSVG: SVGIcon = filePdfIcon;
  public excelSVG: SVGIcon = fileExcelIcon;
  public plusIcon: SVGIcon = plusIcon;
  public form: FormGroup = new FormGroup({
    electionDate: new FormControl(null,[Validators.required]),
    stateId: new FormControl(null,[Validators.required])
  });


constructor(private modalService: NgbModal,private generalService:GeneralService,private stateElectionService:StateElectionService,private snackbarService:SnackbarService){}
 
  ngOnInit(){
  this.removeKendoInvalidLicance() 
  this.getStatesList();
  this.getData();
  }

  openModal(event: Event, content: any) {
    event.preventDefault();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
  }

  getStatesList(){
    const subscription = this.generalService.getAllStates().subscribe(
      (response: any) => {
        this.stateList = response.body.data.map((state: any) => ({ name: state.stateName, value: state.stateId }));
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
    this.subscriptions.push(subscription);
  }

  getData(){
    const subscription = this.stateElectionService.getAllElections().subscribe(
      (response: any) => {
        if (response) {
          this.gridView=response.body.data;
          this.gridData=response.body.data;
        } else {
          this.snackbarService.showToast(false, response.body.console.error);
        }
      },
      (error: any) => {
        this.snackbarService.showToast(false, "Something went wrong.");
      }
    );
    this.subscriptions.push(subscription);
  }


  sheduleElection(content:any){
    if (this.form.valid) {
      const verifySubscription = this.stateElectionService.sheduleElection(this.form.get('stateId')?.value!,this.form.get('electionDate')?.value!).subscribe(
        (response: any) => {
          if (response) {
            this.modalService.dismissAll(content);
            this.snackbarService.showToast(true, response.body.message);
            this.getData();
          } else {
            this.error = response.body.error;
          }
        },
        (error: any) => {
          this.error = "Something went wrong."
        }
      );
      this.subscriptions.push(verifySubscription);
    } else {
      this.error = 'Please fill all fields.';
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
      } else {
      }
    }, 0); 
  }

}
