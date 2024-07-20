import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet, NavigationEnd, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LayoutServiceService } from '../../../services/layout/layout-service.service';
import { LoginComponent } from '../../authentication/login/login.component';
import { ErrorComponent } from '../../other/error/error.component';
import { LoadingService } from '../../../services/loading/loading.service';
import { Observable } from 'rxjs';
import { LoadingComponent } from '../../other/loading/loading.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [LoadingComponent,RouterOutlet,NavbarComponent,SidebarComponent,CommonModule,LoginComponent,ErrorComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
  
})

export class LayoutComponent {
  gridData=[];
  currentPath$ = this.layoutService.currentPath$;
  isLoginPage$ = this.layoutService.isLoginPage$;
  isLoading:Observable<boolean> | undefined;

  constructor(
    private layoutService:LayoutServiceService,
    private loaderService:LoadingService,
    private router:Router,
    private changeDetector:ChangeDetectorRef
    ){}

 async ngOnInit() {
    this.layoutService.setPath();
     this.isLoading =  this.loaderService.loaderState; // Assign Observable directly
  
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationStart) {
        this.loaderService.show();
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.loaderService.hide();
        this.changeDetector.detectChanges(); 
      }
    });
  
  }

}
