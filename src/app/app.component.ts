import { Component } from '@angular/core';
import { LayoutComponent } from './components/layout-window/layout/layout.component';
import { LayoutServiceService } from './services/layout/layout-service.service';
import { ErrorComponent } from './components/other/error/error.component';
import { CommonModule } from '@angular/common';
import { NgToastModule, ToasterPosition } from 'ng-angular-popup';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { HttpClientModule } from '@angular/common/http';
import { LoadingService } from './services/loading/loading.service';
import { RouterModule,Router, RouterOutlet, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { LoadingComponent } from './components/other/loading/loading.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LayoutComponent,
    ErrorComponent,
    CommonModule,
    NgToastModule,
    NgxUiLoaderModule,
    HttpClientModule,
    RouterOutlet,
    LoadingComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'IVS-ControlPanel';
  toasterPosition = ToasterPosition;
  pageNotFound$ = this.layoutService.pageNotFound$;
  
  constructor(private layoutService:LayoutServiceService){}
}
