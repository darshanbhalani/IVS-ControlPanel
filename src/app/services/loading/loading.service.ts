import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loaderSubject = new BehaviorSubject<boolean>(true);
  public loaderState = this.loaderSubject.asObservable();

  show() {
    this.loaderSubject.next(true);
  }

  hide() {
    setTimeout(() => {
      this.loaderSubject.next(false)
    }, 5000)
    // this.loaderSubject.next(false);
  }
}
