import { Component, ElementRef, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LayoutServiceService } from '../../../services/layout/layout-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LabelModule } from '@progress/kendo-angular-label';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DashboardComponent } from '../../module/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterOutlet,
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
    CommonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isOpen$ = this.layoutService.isOpen$;
  isDropdownOpen = false;

  constructor(private eRef: ElementRef, private layoutService: LayoutServiceService) {}


  toggleClass() {
    this.layoutService.toggleSidebar();
    this.resetDropdowns();
  }


  toggleDropdown2() {
    this.layoutService.openSidebar();
    this.isDropdownOpen = !this.isDropdownOpen;
  }


  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.layoutService.closeSidebar();
      this.resetDropdowns();
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    if (window.innerWidth < 1200) {
      this.layoutService.closeSidebar();
      this.resetDropdowns();
    } else {
      this.layoutService.openSidebar();
    }
  }

  private resetDropdowns() {
    if (this.isOpen$) {
      this.isDropdownOpen = false;
    }
  }
}
