  import { Component } from '@angular/core';
  import { HeaderMenu } from "../../header-menu/header-menu";
  import { Metric } from "../../metrics/metrics";
  import { LogsTable } from '../../logs-table/logs-table';


  @Component({
    selector: 'app-principal-home',
    imports: [HeaderMenu, Metric, LogsTable],
    templateUrl: './principal-home.html',
    styleUrl: './principal-home.css'
  })
  export class PrincipalHome {

  }
