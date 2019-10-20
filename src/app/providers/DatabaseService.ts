import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import Bunny from '../entities/Bunny';
import IPC_EVENT from '../ipcEvents';
import { genderOption, rescueTypeOption } from '../components/add-bunny/add-bunny.component';

@Injectable()
export class DatabaseService {
  constructor(private electronService: ElectronService) {}

  rescueTypesCache: rescueTypeOption[];
  genderTypesCache: genderOption[];

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

  getGenders(): Observable<genderOption[]> {
    if (!this.genderTypesCache) {
      let observable = of(
        this.electronService.ipcRenderer.sendSync(IPC_EVENT.getGenders)
      ).pipe(catchError((error: any) => throwError(error.json)));
      observable.subscribe({next: (value: genderOption[]) => {this.genderTypesCache = value}});
      return observable;
    } else {
      return of(this.genderTypesCache);
    }
  }

  getRescueTypes(): Observable<rescueTypeOption[]> {
    if (!this.rescueTypesCache) {
      let observable = of(
        this.electronService.ipcRenderer.sendSync(IPC_EVENT.getRescueTypes)
      ).pipe(catchError((error: any) => throwError(error.json)));
      observable.subscribe({next: (value: rescueTypeOption[]) => {this.rescueTypesCache = value}});
      return observable;
    } else {
      return of(this.rescueTypesCache);
    }
  }
}
