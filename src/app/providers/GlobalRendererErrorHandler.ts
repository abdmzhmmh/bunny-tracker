import { ErrorHandler, Injectable } from '@angular/core';
import { AlertService } from './AlertService';

@Injectable()
export class GlobalRendererErrorHandler implements ErrorHandler {

  public handleError(error: any): void {
    // your custom error handling logic
    this.alertService.genericError(error);
    console.log(error);
  }

  constructor(private alertService: AlertService) {
  }

}
