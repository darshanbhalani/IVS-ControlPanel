import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule, DropDownListComponent } from '@progress/kendo-angular-dropdowns';
import { ExcelModule, GridModule, PDFModule, DataBindingDirective } from '@progress/kendo-angular-grid';
import { SVGIconModule } from '@progress/kendo-angular-icons';
import { InputsModule, SwitchModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { SVGIcon, plusIcon,fileExcelIcon, filePdfIcon } from '@progress/kendo-svg-icons';
import { StateCandidateService } from '../../services/candidate/state-candidate.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { Subscription } from 'rxjs';
import { StateElectionService } from '../../services/stateElection/state-election.service';
import { GeneralService } from '../../services/general/general.service';
import { PartyServiceService } from '../../services/party/party-service.service';
import { process } from '@progress/kendo-data-query';
import { LoadingService } from '../../services/loading/loading.service';
import { CommonModule } from '@angular/common';

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
    FormsModule,
    CommonModule
  ],
  templateUrl: './state-candidates.component.html',
  styleUrl: './state-candidates.component.scss'
})
export class StateCandidatesComponent {
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  @ViewChild('dropdown') dropdown!: DropDownListComponent; 
  data$ = this.candidateService.candidateList$;
  filteredData = this.candidateService.filteredList$
  total:any=this.candidateService.total$;
  verified:any=this.candidateService.verified$;
  unverified:any=this.candidateService.unverified$;
  rejected:any=this.candidateService.rejected$;
  stateList:any;
  filter=0;
  error="";
  selectedFile:any;
  upcommingElectionsList:any=[];
  districtList:any;
  assemblyList:any;
  partyList:any;
  isDataFetched:boolean=false;
  public isCandidateIndependent = false;
  isDistrictSelected:any;
  currentElectionId:any;
  candidateName:any;
  candidateId:any;

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


  constructor( 
    private modalService: NgbModal,
    private candidateService:StateCandidateService,
    private snackbarService:SnackbarService,
    private stateElectionService:StateElectionService,
    private generalServices:GeneralService,
    private partyService:PartyServiceService,
    private loader:LoadingService
    ){}

 

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
        if (this.dropdown) {
          console.log(this.upcommingElectionsList);
          this.dropdown.defaultItem = this.upcommingElectionsList[0];
        }
        await this.getAllCandidates(this.upcommingElectionsList[0].value);
        await this.getAllDistricts(this.upcommingElectionsList[0].stateId);
        this.upcommingElectionsList = this.upcommingElectionsList.slice(1);
      },
      (error: any) => {
        this.snackbarService.showToast(false, "Error fetching data.");
      }
    );
    this.subscriptions.push(dataSubscription);
  }


 async getAllCandidates(electionId:any){
  this.loader.show();
    alert(electionId);
   this.candidateService.getAllCandidates(electionId.toString());
    this.loader.hide();
  }


  async getAllAssemblies(districtId:any){
    const dataSubscription = this.generalServices.getAllAssemblyByDistrict(districtId).subscribe(
      async (response: any) => {
        this.assemblyList = response.body.data.map((item: any) => ({
          name: item.asseblyName,
          value: item.asseblyId
        }));
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

  openEditModal(event: Event, content: any,data:any) {
    event.preventDefault();
    this.imageSrc= 'data:image/jpeg;base64,'+data.electionPartyLogoUrl;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
  }

  openDeleteModal(event: Event, content: any,data: any) {
    event.preventDefault();
    this.candidateId=data.id;
    this.candidateName=data.name;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'md' });
  }

  openVerifyModal(event: Event, content: any, data: any) {
    event.preventDefault();
    this.candidateId=data.id;
    this.candidateName=data.name;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'md' });
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
    this.currentElectionId=event.value;
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
              // await this.getAllCandidates(this.currentElectionId);
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


  updateCandidate(){

  }


  verifyCandidate(content:any){
    const verifySubscription = this.candidateService.verifyCandidate(this.candidateId,this.currentElectionId).subscribe(
      (response: any) => {
        if (response) {
          this.modalService.dismissAll(content);
          // this.getAllCandidates(this.currentElectionId);
          this.candidateId=null;
          this.candidateName=null;
          this.snackbarService.showToast(true, response.body.message);
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


  deleteCandidate(content:any){
    const verifySubscription = this.candidateService.deleteCandidate(this.candidateId).subscribe(
      (response: any) => {
        if (response) {
          this.modalService.dismissAll(content);
          // this.getAllCandidates(this.currentElectionId);
          this.candidateId=null;
          this.candidateName=null;
          this.snackbarService.showToast(true, response.body.message);
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

  public onFilter(value: Event): void {
    this.filter = ("" + value).length;
    this.candidateService.filter(value);
    this.dataBinding.skip = 0;
  }

  showVerifiedCandidates() {
    this.candidateService.showVerifiedCandidates();
    this.filter = 1;
    this.dataBinding.skip = 0;
  }

  showUnverifiedCandidates() {
    this.candidateService.showUnverifiedCandidates();
    this.filter = 1;
    this.dataBinding.skip = 0;
  }

  showAllCandidates() {
    this.filter = 0;
    this.dataBinding.skip = 0;
  }

  showRejectedCandidates() {
    this.candidateService.showRejectedCandidates();
    this.filter = 1;
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
      }
    }, 0); 
  }
}
