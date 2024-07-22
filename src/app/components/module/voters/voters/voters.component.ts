import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LabelModule } from '@progress/kendo-angular-label';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { SVGIcon, plusIcon } from '@progress/kendo-svg-icons';
import { SVGIconModule } from '@progress/kendo-angular-icons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

@Component({
  selector: 'app-voters',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LabelModule,
    FormsModule,
    DropDownsModule,
    ButtonModule,
    InputsModule,
    SVGIconModule,
    DateInputsModule
  ],
  templateUrl: './voters.component.html',
  styleUrl: './voters.component.scss'
})
export class VotersComponent {

  error:any;
  imageSrc:any;
  public plusIcon: SVGIcon = plusIcon;
  stateList:any;
  districtList:any;
  assemblyList:any;
  genderList = [
    { name: "Male", value: "M" },
    { name: "Female", value: "F" },
    { name: "Other", value: "O" }
  ];
  public form: FormGroup = new FormGroup({
    vName: new FormControl(null, [Validators.required, Validators.minLength(5),Validators.maxLength(50)]),
    fName:new FormControl(null, [Validators.required, Validators.minLength(5),Validators.maxLength(50)]),
    birthDate: new FormControl(null, [Validators.required]),
    gender: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required, Validators.maxLength(10),Validators.maxLength(50)]),
    state: new FormControl(null, [Validators.required]),
    district: new FormControl(null, [Validators.required]),
    assemblyId:new FormControl(null, [Validators.required]),
    address:new FormControl(null, [Validators.required])
  });

  constructor(private modalService:NgbModal){}

  openAddModal(event: Event, content: any) {
    event.preventDefault();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
  }
  onFileChange(event:any){}
}

