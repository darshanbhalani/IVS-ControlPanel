import { Component, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputsModule, FormFieldComponent } from '@progress/kendo-angular-inputs';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LabelModule } from '@progress/kendo-angular-label';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DashboardComponent } from '../../module/dashboard/dashboard.component';
import { PopupModule } from '@progress/kendo-angular-popup';
import { log } from 'console';
import { Conditional } from '@angular/compiler';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user/user.service';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';

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
    PopupModule,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  currentPath$ = this.userService.userName$;
  data = [
    { name: "My Profile",value:1 },
    { name: "Account Settings",value:2 },
    { name: "Log Out",value:3 },
  ];
  form = {
    "profileUrl":"",
    "code":"",
    "userName":"",
    "email":"",
    "phoneNumber":"",
    "gender":"",
    "role":""
  };

  constructor(private modalService: NgbModal,private userService:UserService,private snackbarService:SnackbarService){}

  onDropdownClick(event:any,content1: any,content2: any){
    if(event.value===1){
      this.userService.getUserProfile().subscribe((response:any) => {
        if(response.success){
          this.form["profileUrl"]=response.body.data.profileUrl;
          this.form["code"]=response.body.data.code;
          this.form["userName"]=response.body.data.userName;
          this.form["email"]=response.body.data.email;
          this.form["phoneNumber"]=response.body.data.phoneNumber.toString();
          this.form["gender"]=response.body.data.gender;
          this.form["role"]=response.body.data.role;
        }
        else{
          console.log("Unable to fetch.")
        }
      });
      this.modalService.open(content1, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
    }else if(event.value===2){
      this.snackbarService.showToast(true,"Hello");
    }
    else if(event.value===3){
      this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'sm' });
    }
  }

  logout(event:any,content: any){
    this.userService.removeToken();
    this.modalService.dismissAll();
  }
}
