import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import Bunny from '../entities/bunny.schema';
import IPC_EVENT from '../ipcEvents';

@Injectable()
export class DatabaseService {
  constructor(private electronService: ElectronService) {}

  getBunnies(): Observable<Bunny[]> {
    return of(this.electronService.ipcRenderer.sendSync(IPC_EVENT.getBunny)).pipe(
      catchError((error: any) => throwError(error.json))
    );
  }

  addBunny(bunny: Bunny): Observable<Bunny[]> {
    return of(
      this.electronService.ipcRenderer.sendSync(IPC_EVENT.addBunny, Bunny)
    ).pipe(catchError((error: any) => throwError(error.json)));
  }

  deleteBunny(bunny: Bunny): Observable<Bunny[]> {
    return of(
      this.electronService.ipcRenderer.sendSync(IPC_EVENT.deleteBunny, Bunny)
    ).pipe(catchError((error: any) => throwError(error.json)));
  }
}
