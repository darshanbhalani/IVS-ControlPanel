import { Component, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputsModule, FormFieldComponent } from '@progress/kendo-angular-inputs';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LabelModule } from '@progress/kendo-angular-label';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PopupModule } from '@progress/kendo-angular-popup';
import { log } from 'console';
import { Conditional } from '@angular/compiler';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterOutlet,
    LayoutComponent,
    FormsModule,
    InputsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    DropDownsModule,
    LabelModule,
    ButtonsModule,
    RouterLink,
    DashboardComponent,
    PopupModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  data = [
    { name: "My Profile",value:1 },
    { name: "Account Settings",value:2 },
    { name: "Log Out",value:3 },
  ];

  constructor(private modalService: NgbModal){}

  onDropdownClick(event:any,content1: any,content2: any){
    if(event.value===1){
      this.modalService.open(content1, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
    }else if(event.value===3){
      this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'sm' });
    }
  }
}
