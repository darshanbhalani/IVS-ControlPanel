import { Component } from '@angular/core';
import { RouterOutlet, NavigationEnd } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators'
import { LayoutServiceService } from '../../services/Layout Service/layout-service.service';
import { LoginComponent } from '../login/login.component';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,SidebarComponent,CommonModule,LoginComponent,ErrorComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
  
})

export class LayoutComponent {
  gridData=[];
  currentPath$ = this.layoutService.currentPath$;
  isLoginPage$ = this.layoutService.isLoginPage$;
  

  constructor(private router: Router,private layoutService : LayoutServiceService) {}

  ngOnInit() {
    this.layoutService.setPath();
  }
  
}
