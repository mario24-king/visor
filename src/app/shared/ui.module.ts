import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Skeleton } from "primeng/skeleton";
import { TableModule } from "primeng/table";
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from "primeng/selectbutton";
import { InputOtpModule } from 'primeng/inputotp';
import { StepperModule } from 'primeng/stepper';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Dialog } from 'primeng/dialog';
import { DatePicker } from "primeng/datepicker";
import { MessageService, SelectItem } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { DrawerModule } from 'primeng/drawer';
import { ChartModule } from 'primeng/chart';
import { PaginatorModule } from "primeng/paginator";
import { LogServices } from "../core/services/log-services";
import { AutoCompleteModule } from 'primeng/autocomplete';


@NgModule({
  imports: [Skeleton, Dialog, DatePicker],
  exports: [Skeleton,
    IconFieldModule,
    InputIconModule,
    StepperModule,
    ToggleButtonModule,
    InputOtpModule,
    ToastModule,
    TableModule,
    CardModule,
    CommonModule,
    ChartModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    OverlayBadgeModule,
    ReactiveFormsModule,
    FormsModule,
    SelectButtonModule,
    Dialog,
    DatePicker,
    TagModule,
    SelectModule,
    DrawerModule,
    ChartModule,
    PaginatorModule,
    AutoCompleteModule,
  ],
  providers:[MessageService, LogServices]
})

export class UiModule {}
