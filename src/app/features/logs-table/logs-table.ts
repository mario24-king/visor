import { Component } from '@angular/core';
import { Customer } from '../../core/models/log.models';
import { UiModule } from '../../shared/ui.module';
import { LogServices } from '../../core/services/log-services';
import { SidebarStateService } from '../../core/services/sidebarState-services'; // <-- Agrega esto
import { LogStateService } from '../../core/services/log-state.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

@Component({
  selector: 'app-logs-table',
  templateUrl: './logs-table.html',
  styleUrls: ['./logs-table.css'],
  standalone: true,
  imports: [UiModule],
})
export class LogsTable {
  customers!: Customer[];
  cols!: Column[];

  filteredCustomers: Customer[] = [];
  filterDate: string = '';
  filterStatus: string = '';

  descriptionVisible: boolean = false;
  calendarVisible: boolean = false;
  sidebarVisible: boolean = false;

  filtroUsuario: any;
  filtrofecha: any;

  date: any;
  visibility: boolean = false;
  comboChartData: any;

  totalLogs = 0;
  totalSuccess = 0;
  totalErrors = 0;
  tableFilteredData: any;

  currentPage: number = 0;
  rowsPerPage: number = 5;

  constructor(
    private customerService: LogServices,
    private sidebarState: SidebarStateService,
    private logState: LogStateService
  ) {
    this.sidebarState.sidebarVisible$.subscribe(
      (visible) => (this.sidebarVisible = visible)
    );
  }

  ngOnInit() {
    this.customerService.getLogs().subscribe({
      next: (logs) => {
        this.customers = logs;
        this.filteredCustomers = logs;

        //llenar flujo de metricas
        this.logState.setAllLogs(logs);

        // Llenar flujo de tabla y filtro
        this.logState.setFilteredLogs(logs);
      },
      error: (err) => {
        console.error('Error cargando logs', err);
      },
    });

    this.cols = [
      { field: 'date', header: 'Date' },
      { field: 'username', header: 'Username' },
      { field: 'status', header: 'Status' },
      { field: 'action', header: 'Action' },
    ];

    this.logState.logs$.subscribe((logs) => {
      if (logs.length > 0) {
        this.customers = logs;
        this.filteredCustomers = logs; // <-- Actualiza también los filtrados
      }
    });

    this.logState.allLogs$.subscribe((logs) => {
      this.totalLogs = logs.length;
      this.totalSuccess = logs.filter((l) => l.status === 'SUCCESS').length;
      this.totalErrors = logs.filter((l) => l.status === 'ERROR').length;
    });
  }

  onPageChange(event: any) {
    this.currentPage = event.page;
    this.rowsPerPage = event.rows;
  }

  // Ordenamiento personalizado para fechas
  customSort(event: any) {
    event.data.sort((data1: any, data2: any) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = 0;
      if (event.field === 'date') {
        // Intenta parsear como fecha
        const date1 = new Date(value1);
        const date2 = new Date(value2);
        result = date1.getTime() - date2.getTime();
      } else {
        if (value1 == null && value2 != null) result = -1;
        else if (value1 != null && value2 == null) result = 1;
        else if (value1 == null && value2 == null) result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
          result = value1.localeCompare(value2);
        else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
      }
      return event.order * result;
    });
  }

  onTableFilter(event: any) {
    if (event.filteredValue) {
      this.tableFilteredData = event.filteredValue;
    } else {
      this.applyFilters();
    }
    const hasCustomFilters = this.filterDate !== '' || this.filterStatus !== '';
    if (hasCustomFilters) {
      this.applyFilters();
    } else {
      this.filteredCustomers = [...this.customers];
      this.tableFilteredData = [...this.customers];
    }
  }

  applyFilters() {
    this.filteredCustomers = this.customers.filter((c) => {
      const dateMatch = this.filterDate
        ? c.date.startsWith(this.filterDate)
        : true;
      const statusMatch = this.filterStatus
        ? c.status === this.filterStatus
        : true;
      return dateMatch && statusMatch;
    });

    this.tableFilteredData = [...this.filteredCustomers];
  }

  // ✅ Métodos para mostrar/ocultar el calendario
  showDialogCalendar() {
    this.calendarVisible = true;
  }

  get isSidebarOpen(): boolean {
    return this.sidebarVisible;
  }

  // ✅ Métodos para mostrar/ocultar el sidebar
  showSidebar() {
    this.sidebarState.setSidebarVisible(true);
  }

  hideSidebar() {
    this.sidebarState.setSidebarVisible(false);
  }

  // ✅ Método para mostrar la descripción del log
  selectedCustomer?: Customer;

  showDescriptionDialog(customer: Customer) {
    this.selectedCustomer = customer;
    this.descriptionVisible = true;
  }
  getSeverity(status: string) {
    switch (status) {
      case 'SUCCESS':
        return 'success';
      case 'WARNING':
        return 'warn';
      case 'ERROR':
        return 'danger';
      default:
        return 'info';
    }
  }
  exportPDF(dt: any) {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text('Visor Logs - Exportación PDF', 14, 15);

    const exportData = (
      this.tableFilteredData?.length
        ? this.tableFilteredData
        : this.filteredCustomers
    ) as Customer[];

    // Obtener el rango de la página actual directamente desde dt
    const startIndex = dt.first;
    const endIndex = dt.first + dt.rows;
    const currentPageData = exportData.slice(startIndex, endIndex);

    // Convertimos data de tabla
    const tableData = currentPageData.map((c: Customer) => [
      c.date,
      c.username,
      c.status,
      c.action,
    ]);

    const headers = [['Date', 'Username', 'Status', 'Action']];
    autoTable(doc, {
      head: headers,
      body: tableData,
      startY: 25,
    });
    doc.save('visor-logs.pdf');
  }

  exportCSV(dt: any) {
    // Obtener los datos filtrados (si existen)
    const exportData = (
      this.tableFilteredData?.length
        ? this.tableFilteredData
        : this.filteredCustomers
    ) as Customer[];
    // Obtener la página actual desde dt
    const startIndex = dt.first;
    const endIndex = dt.first + dt.rows;
    // Solo los registros visibles en la página actual
    const currentPageData = exportData.slice(startIndex, endIndex);
    // Encabezados del CSV
    const headers = ['Date', 'Username', 'Status', 'Action'];
    // Convertir a formato CSV
    let csvContent = headers.join(',') + '\n';
    currentPageData.forEach((c) => {
      const row = [c.date, c.username, c.status, c.action].join(',');
      csvContent += row + '\n';
    });
    // Crear archivo CSV y descargarlo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'visor-logs.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
