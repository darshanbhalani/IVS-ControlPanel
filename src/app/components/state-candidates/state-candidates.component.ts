import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { SVGIconModule } from '@progress/kendo-angular-icons';
import { InputsModule, SwitchModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { SVGIcon, plusIcon,fileExcelIcon, filePdfIcon } from '@progress/kendo-svg-icons';
import { log, Console } from 'console';
import { StateCandidateService } from '../../services/candidate/state-candidate.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { Subscription } from 'rxjs';
import { StateElectionService } from '../../services/stateElection/state-election.service';
import { GeneralService } from '../../services/general/general.service';
import { PartyServiceService } from '../../services/party/party-service.service';
import { createDecipher } from 'crypto';

interface DropDownModel{
  name:string,
  value:any
}

@Component({
  selector: 'app-state-candidates',
  standalone: true,
  imports: [
    DropDownsModule,
    GridModule,
    InputsModule,
    SVGIconModule,
    ExcelModule,
    PDFModule,
    ButtonModule,
    ReactiveFormsModule,
    LabelModule,
    DropDownsModule,
    SwitchModule,
    FormsModule
  ],
  templateUrl: './state-candidates.component.html',
  styleUrl: './state-candidates.component.scss'
})
export class StateCandidatesComponent {
  gridData=[];
  gridView:any[]=[];
  stateList:any;
  stateControl: FormControl;
  error="";
  selectedFile:any;
  upcommingElectionsList:any;
  districtList:any;
  assemblyList:any;
  partyList:any;
  isDataFetched:boolean=false;
  public isCandidateIndependent = false;
  isDistrictSelected:any;
  currentElectionId:any;

  imageSrc: string | ArrayBuffer | null = null;
  genderList = [
    {name:"Male" ,value:"M"},
    {name:"Female" ,value:"F"},
    {name:"Other" ,value:"O"}
  ]

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
  private subscriptions: Subscription[] = [];
  
  public form: FormGroup = new FormGroup({
    candidateName: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    candidateGender: new FormControl(null,[Validators.required]),
    candidateEpic: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
    candidateAssemblyId: new FormControl(null, [Validators.required]),
    candidatePartyId:new FormControl()
  });


  constructor( private modalService: NgbModal,private candidateService:StateCandidateService,private snackbarService:SnackbarService,private stateElectionService:StateElectionService,private generalServices:GeneralService,private partyService:PartyServiceService){
    this.stateControl = new FormControl('AK'); 
  }

 
  

  async ngOnInit() {
    this.removeKendoInvalidLicance();
    await this.getAllUpCommingElections();
    this.isDistrictSelected=false;
    await this.getAllParties();
  }
  
  async getAllDistricts(stateId:any){
    const dataSubscription = this.generalServices.getAllDistricts(stateId).subscribe(
      async (response: any) => {
        this.districtList = response.body.data.map((item: any) => ({
          name: item.districtName,
          value: item.districtId
        }));
        await this.getAllAssemblies(this.districtList[0].value);
      },
      (error: any) => {
        this.snackbarService.showToast(false, "Error fetching data.");
      }
    );
    this.subscriptions.push(dataSubscription);
  }


  async getAllParties(){
    const dataSubscription = this.partyService.getAllVerifiedParties().subscribe(
      async (response: any) => {
        this.partyList = response.body.data.map((item: any) => ({
          name: item.electionPartyName,
          value: item.electionPartyId
        }));
      },
      (error: any) => {
        this.snackbarService.showToast(false, "Error fetching data.");
      }
    );
    this.subscriptions.push(dataSubscription);
  }


  async getAllUpCommingElections() {
    const dataSubscription = this.stateElectionService.getAllUpcommingElections().subscribe(
      async (response: any) => {
        this.upcommingElectionsList = response.body.data.map((item: any) => ({
          name: item.stateName,
          value: item.stateElectionId,
          stateId:item.stateId
        }));
        await this.getAllCandidates(this.upcommingElectionsList[0].value);
        await this.getAllDistricts(this.upcommingElectionsList[0].stateId);
      },
      (error: any) => {
        this.snackbarService.showToast(false, "Error fetching data.");
      }
    );
    this.subscriptions.push(dataSubscription);
  }


 async getAllCandidates(electionId:any){
   this.currentElectionId=electionId;
    const dataSubscription=this.candidateService.getAllCandidates(electionId).subscribe(
      (response: any) => {
        this.gridData = response.body.data;
        this.gridView = this.gridData;
      },
      (error: any) => {
        this.snackbarService.showToast(false, "Error fetching data.");
      }
    );
    this.subscriptions.push(dataSubscription);
  }


  async getAllAssemblies(districtId:any){
    const dataSubscription = this.generalServices.getAllAssemblyByDistrict(districtId).subscribe(
      async (response: any) => {
        this.assemblyList = response.body.data.map((item: any) => ({
          name: item.asseblyName,
          value: item.asseblyId
        }));
        console.log("Assembly Change...");
      },
      (error: any) => {
        this.snackbarService.showToast(false, "Error fetching data.");
      }
    );
    this.subscriptions.push(dataSubscription);
  }


  openAddModal(event: Event, content: any) {
    event.preventDefault();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
  }


  async onDistrictChange(event:any){
    if(event.value!=0){
      await this.getAllAssemblies(event.value);
      this.isDistrictSelected=true;
    }else{
      this.isDistrictSelected=false;
    }
  }


  async onElectionChange(event:any){
    await this.getAllDistricts(event.stateId);
    await this.getAllCandidates(event.value);
  }
  

  onFileChange(event:any){
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


getVoterDetails(voterId:any){

}


  toggle(){
    this.isCandidateIndependent=!this.isCandidateIndependent;
  }


  addNewCandidate(){
    if (this.form.valid) {
      if (( this.isCandidateIndependent && this.selectedFile != null) || ( !this.isCandidateIndependent && (this.form.get('candidatePartyId')?.value).value != null) ) {
        const fData = new FormData();
        fData.append('name', this.form.get('candidateName')?.value!);
        fData.append('gender', (this.form.get('candidateGender')?.value).value!);
        fData.append('epic', this.form.get('candidateEpic')?.value!);
        fData.append('assemblyId', (this.form.get('candidateAssemblyId')?.value).value!);
        fData.append('electionId',this.currentElectionId );
        if(this.isCandidateIndependent){
          fData.append('image', this.selectedFile); 
        }else{
          fData.append('partyId',(this.form.get('candidatePartyId')?.value).value!);
        }

        const subscription = this.candidateService.addNewCandidate(fData).subscribe(
          async (response: any) => {
            if (response.success) {
              await this.getAllCandidates(this.currentElectionId);
              this.modalService.dismissAll();
              this.snackbarService.showToast(true, response.body.message);
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
        this.subscriptions.push(subscription);
      } else {
        this.error = 'Please upload candidate logo.';
      }
    } else {
      this.error = 'Please fill all the fields.';
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
