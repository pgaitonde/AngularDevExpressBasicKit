import {
  Injectable
} from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBarConfig
} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  config = new MatSnackBarConfig();

  constructor(public snackBar: MatSnackBar) {
    this.config.verticalPosition = this.verticalPosition;
    this.config.horizontalPosition = this.horizontalPosition;
    this.config.duration = 2000;
    this.config.panelClass = ['rms-snackbar'];
  }

  open(message: string) {
    this.snackBar.open(message, null, this.config);
  }

}
