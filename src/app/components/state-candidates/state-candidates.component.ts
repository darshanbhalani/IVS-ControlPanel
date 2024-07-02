import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { SVGIconModule } from '@progress/kendo-angular-icons';
import { InputsModule, SwitchModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { SVGIcon, plusIcon,fileExcelIcon, filePdfIcon } from '@progress/kendo-svg-icons';
import { log } from 'console';

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
  stateList:any;
  stateControl: FormControl;
  error="";
  selectedFile:any;
  imageSrc: string | ArrayBuffer | null = null;
  public checked = false;
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
    candidateName: new FormControl(),
    candidateGender: new FormControl(),
    candidateEpic: new FormControl(),
    candidateProfileUrl: new FormControl(),
    candidateElectionId: new FormControl(),
    candidateAssemblyId: new FormControl()
  });


  constructor( private modalService: NgbModal){
    this.stateControl = new FormControl('AK'); 
  }


  ngOnInit() {
    this.removeKendoInvalidLicance();
  }
  

  openAddModal(event: Event, content: any) {
    event.preventDefault();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
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


  toggle(){
    this.checked=!this.checked;
    console.log("Called..");
    console.log(this.checked);
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
