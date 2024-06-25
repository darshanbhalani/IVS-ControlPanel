import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutServiceService {

  private isOpen = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpen.asObservable();

  toggleSidebar() {
    this.isOpen.next(!this.isOpen.value);
    console.log(this.isOpen$);
  }

  openSidebar() {
    this.isOpen.next(true);
    console.log(this.isOpen$);
  }

  closeSidebar() {
    this.isOpen.next(false);
    console.log(this.isOpen$);
  }
}
