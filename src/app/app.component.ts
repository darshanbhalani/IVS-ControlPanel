import { Component } from '@angular/core';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutServiceService } from './services/layout/layout-service.service';
import { ErrorComponent } from './components/error/error.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent,ErrorComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'IVS-ControlPanel';
  pageNotFound$ = this.layoutService.pageNotFound$;

  constructor(private layoutService:LayoutServiceService){}
}
