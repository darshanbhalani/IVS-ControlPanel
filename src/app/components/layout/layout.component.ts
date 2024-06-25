import { Component } from '@angular/core';
import { RouterOutlet, NavigationEnd } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { Router } from 'express';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,SidebarComponent,CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
  
})

export class LayoutComponent {
  gridData=[];
  currentPath: string;

  constructor(private router: Router) {
    this.currentPath = '';
  }

  ngOnInit() {
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.urlAfterRedirects;
      }
    });
  }
}
