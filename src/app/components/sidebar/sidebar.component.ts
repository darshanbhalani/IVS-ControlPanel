import { Component, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LabelModule } from '@progress/kendo-angular-label';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-sidebar',
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
    DashboardComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isClassAdded: boolean = true;
  isDropdownOpen1: boolean = false;
  isDropdownOpen2: boolean = false;
  isDropdownOpen3: boolean = false;


  constructor(private eRef: ElementRef, private renderer: Renderer2) {
    this.renderer.listen('document', 'click', (event) => {
      if (!this.eRef.nativeElement.contains(event.target)) {
        this.isClassAdded = false;
      }
    });
  }

  toggleClass(): void {
    this.isClassAdded = !this.isClassAdded;
    if(!this.isClassAdded){
      this.isDropdownOpen1=false;
      this.isDropdownOpen2=false;
      this.isDropdownOpen3=false;
    }
  }

  toggleDropdown1() {
    if(!this.isClassAdded){
      this.isClassAdded=true;
    }
    this.isDropdownOpen1 = !this.isDropdownOpen1;
  }
  toggleDropdown2() {
    if(!this.isClassAdded){
      this.isClassAdded=true;
    }
    this.isDropdownOpen2 = !this.isDropdownOpen2;
  }
  toggleDropdown3() {
    if(!this.isClassAdded){
      this.isClassAdded=true;
    }
    this.isDropdownOpen3 = !this.isDropdownOpen3;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    if (window.innerWidth < 1200) {
      this.isClassAdded = false;
      if(!this.isClassAdded){
        this.isDropdownOpen1=false;
        this.isDropdownOpen2=false;
        this.isDropdownOpen3=false;
      }
    }
    if (window.innerWidth > 1200) {
      this.isClassAdded = true;
    }
  }

}
