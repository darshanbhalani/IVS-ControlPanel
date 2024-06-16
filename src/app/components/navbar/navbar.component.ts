import { Component, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LabelModule } from '@progress/kendo-angular-label';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PopupModule } from '@progress/kendo-angular-popup';
import { log } from 'console';

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
    { text: "My Profile" },
    { text: "Account Settings" },
    { text: "Log Out" },
  ];
}
