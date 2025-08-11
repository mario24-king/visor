import { Customer } from './../models/log.models';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LogStateService {
  
  //filtro de logs por texto
  private logsSource = new BehaviorSubject<any[]>([]);
  logs$ = this.logsSource.asObservable();

  setLogs(logs: any[]) {
    this.logsSource.next(logs);
  }

  private allLogsSubject = new BehaviorSubject<Customer[]>([]);
  allLogs$ = this.allLogsSubject.asObservable();

  setAllLogs(logs: Customer[]) {
    this.allLogsSubject.next(logs);
  }

  setFilteredLogs(logs: Customer[]) {
    this.logsSource.next(logs);

  }
}
