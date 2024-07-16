import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private snackbars: any[] = [];

  constructor(private snackBar: MatSnackBar) { }

  showToast(isSuccess: boolean, message: string): void {
    if (this.snackbars.length >= 5) {
      const oldestSnackbar = this.snackbars.shift();
      oldestSnackbar?.dismiss();
    }

    const config: MatSnackBarConfig = {
      data: { message, isSuccess },
      duration: 40000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: isSuccess ? 'success-snackbar' : 'error-snackbar'
    };

    const snackbarRef = this.snackBar.openFromComponent(SnackbarComponent, config);
    this.snackbars.push(snackbarRef);

    snackbarRef.afterDismissed().subscribe(() => {
      this.snackbars = this.snackbars.filter(snackbar => snackbar !== snackbarRef);
    });
  }
}
