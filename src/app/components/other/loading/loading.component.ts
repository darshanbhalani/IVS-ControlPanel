import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  inputs:['isLoading']
})
export class LoadingComponent {
  isLoading:any;

  ngOnInit(){
    console.log(this.isLoading);
  }
}
