import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackService {
  private horizontalPosition: MatSnackBarHorizontalPosition = 'end'; //'start' | 'center' | 'end' | 'left' | 'right'
  private verticalPosition: MatSnackBarVerticalPosition = 'top'; //'bottom'

  constructor(private snackbar: MatSnackBar) { }


  open(message:string, color:string = 'text-gris', time:number = 2){
    return this.snackbar.open(message," ", {
        duration:(time * 1000),
        horizontalPosition:this.horizontalPosition,
        verticalPosition:this.verticalPosition,
        panelClass:color
    });
  }

  openSnack(data:any = null){
    /* this.snackbar.openFromComponent(,{
      duration: 2000
    }); */
  }


  openSnackBar() {
    this.snackbar.open('Cannonball!!', 'Splash', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: 'bottom',
    });
  }
}
