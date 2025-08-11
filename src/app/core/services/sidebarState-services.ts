import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidebarStateService {
  private _sidebarVisible = new BehaviorSubject<boolean>(false);
  sidebarVisible$ = this._sidebarVisible.asObservable();

  setSidebarVisible(visible: boolean) {
    this._sidebarVisible.next(visible);
  }
}
