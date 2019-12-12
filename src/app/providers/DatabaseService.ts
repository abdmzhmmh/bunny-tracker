import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import Bunny from '../entities/Bunny';
import IPC_EVENT from '../ipcEvents';
import {
  DateOfBirthExplanationOption,
  GenderOption,
  RescueTypeOption, SpayExplanationOption
} from '../components/add-bunny/add-bunny.component';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private electronService: ElectronService) {}

  rescueTypeOptionsCache: RescueTypeOption[];
  genderOptionsCache: GenderOption[];
  dateOfBirthExplanationOptionsCache: DateOfBirthExplanationOption[];
  spayExplanationOptionsCache: SpayExplanationOption[];

  getBunny(id: number): Observable<Bunny> {
    return of(this.electronService.ipcRenderer.sendSync(IPC_EVENT.getBunny, id)).pipe(
      catchError((error: any) => throwError(error.json))
    );
  }

  getAllBunnies(): Observable<Bunny[]> {
    return of(this.electronService.ipcRenderer.sendSync(IPC_EVENT.getBunnies)).pipe(
      catchError((error: any) => throwError(error.json))
    );
  }

  addBunny(bunny: Bunny): Observable<Bunny> {
    return of(
      this.electronService.ipcRenderer.sendSync(IPC_EVENT.addBunny, bunny)
    ).pipe(catchError((error: any) => throwError(error.json)));
  }

  updateBunny(bunny: Bunny): Observable<void> {
    return of(
      this.electronService.ipcRenderer.sendSync(IPC_EVENT.updateBunny, bunny)
    ).pipe(catchError((error: any) => throwError(error.json)));
  }

  getGenders(): Observable<GenderOption[]> {
    if (!this.genderOptionsCache) {
      const observable = of(
        this.electronService.ipcRenderer.sendSync(IPC_EVENT.getGenders)
      ).pipe(catchError((error: any) => throwError(error.json)));
      observable.subscribe({next: (value: GenderOption[]) => { this.genderOptionsCache = value; }});
      return observable;
    } else {
      return of(this.genderOptionsCache);
    }
  }

  getRescueTypes(): Observable<RescueTypeOption[]> {
    if (!this.rescueTypeOptionsCache) {
      const observable = of(
        this.electronService.ipcRenderer.sendSync(IPC_EVENT.getRescueTypes)
      ).pipe(catchError((error: any) => throwError(error.json)));
      observable.subscribe({next: (value: RescueTypeOption[]) => { this.rescueTypeOptionsCache = value; }});
      return observable;
    } else {
      return of(this.rescueTypeOptionsCache);
    }
  }

  getDateOfBirthExplanations(): Observable<DateOfBirthExplanationOption[]> {
    if (!this.dateOfBirthExplanationOptionsCache) {
      const observable = of(
        this.electronService.ipcRenderer.sendSync(IPC_EVENT.getDateOfBirthExplanationTypes)
      ).pipe(catchError((error: any) => throwError(error.json)));
      observable.subscribe({next: (value: DateOfBirthExplanationOption[]) => { this.dateOfBirthExplanationOptionsCache = value; }});
      return observable;
    } else {
      return of(this.dateOfBirthExplanationOptionsCache);
    }
  }

  getSpayExplanations(): Observable<SpayExplanationOption[]> {
    if (!this.spayExplanationOptionsCache) {
      const observable = of(
        this.electronService.ipcRenderer.sendSync(IPC_EVENT.getSpayExplanationTypes)
      ).pipe(catchError((error: any) => throwError(error.json)));
      observable.subscribe({next: (value: SpayExplanationOption[]) => { this.spayExplanationOptionsCache = value; }});
      return observable;
    } else {
      return of(this.spayExplanationOptionsCache);
    }
  }

}
