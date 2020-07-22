import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private snackBar: MatSnackBar) {
  }

  public genericError(error: any) {
    this.snackBar.open(`An error occured ${error}.`, 'Dismiss', {
      panelClass: 'snackbar-message-failure'
    });
  }

  public databaseErrorSavingBunny(bunnyName: string, error: any) {
    this.snackBar.open(`Failure occurred while trying to save bunny named ${bunnyName}. Error was ${error}`, 'Dismiss', {
      panelClass: 'snackbar-message-failure'
    });
  }

  public databaseSuccessSavingBunny(bunnyName: string) {
    this.snackBar.open(`The bunny ${bunnyName} saved successfully!`, undefined, {
      duration: 2000,
      panelClass: 'snackbar-message-success'
    });
  }

  public databaseErrorFetching(error: any) {
    this.snackBar.open(`Failure occurred while trying to fetch data. Error was ${error}`, 'Dismiss', {
      panelClass: 'snackbar-message-failure'
    });
  }
}
