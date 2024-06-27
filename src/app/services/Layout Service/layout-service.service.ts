import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavigationEnd, Router} from '@angular/router';
import { filter } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LayoutServiceService {

  private isOpen = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpen.asObservable();
  private pageNotFound = new BehaviorSubject<boolean>(false);
  pageNotFound$ = this.pageNotFound.asObservable();
  private isLoginPage = new BehaviorSubject<boolean>(true);
  isLoginPage$ = this.isLoginPage.asObservable();

  private currentPath = new BehaviorSubject<string>("");
  currentPath$ = this.currentPath.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkPath();
    });
  }

  toggleSidebar() {
    this.isOpen.next(!this.isOpen.value);
  }

  openSidebar() {
    this.isOpen.next(true);
  }

  closeSidebar() {
    this.isOpen.next(false);
  }

  checkPath() {
    if(this.router.url === '/error'){
      this.pageNotFound.next(true);
    }

    if (this.router.url === '/account/login') {
      this.isLoginPage.next(true);
    }else {
      this.isLoginPage.next(false);
    }
    
    this.setPath();
  }

  setPath() {
    this.currentPath.next(this.router.url.toString().slice(1));
  }
}
