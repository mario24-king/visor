import { Component, OnInit } from '@angular/core';
import { UiModule } from '../../shared/ui.module';
import { SidebarStateService } from '../../core/services/sidebarState-services';
import { LogStateService } from '../../core/services/log-state.service';

@Component({
  selector: 'app-metrics',
  imports: [UiModule],
  templateUrl: './metrics.html',
  styleUrl: './metrics.css',
})
export class Metric implements OnInit {
  date: any;
  visible = false;
  sidebarVisible = false;

  comboChartData: any;
  comboChartOptions: any;

  pieChartData: any;
  pieChartOptions: any;

  constructor(
    private sidebarState: SidebarStateService,
    private logState: LogStateService // ✅ Aquí inyectamos correctamente
  ) {
    // Datos del gráfico de barras y línea
    this.comboChartData = {
      labels: [
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
      ],
      datasets: [
        {
          label: 'Errores',
          type: 'line',
          data: [30, 55, 25, 40, 30, 50, 70],
          fill: false,
          borderColor: '#42A5F5',
          pointBackgroundColor: '#42A5F5',
          tension: 0.4,
        },
        {
          label: 'Logs',
          type: 'bar',
          data: [45, 60, 35, 80, 50, 70, 90],
          backgroundColor: '#FFA726',
        },
      ],
    };

    this.comboChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: '#ffffff' },
        },
        title: {
          display: true,
          text: 'Statistics Logger',
          color: '#ffffff',
        },
      },
      scales: {
        y: {
          suggestedMin: 0, //ajusta minimo de visibilidad de logs
          suggestedMax: 20, // y el maximo del mismo
          ticks: {
            color: '#ffffff',
            stepSize: 10,
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.2)',
          },
        },
        x: {
          ticks: {
            color: '#ffffff',
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.2)',
          },
        },
      },
    };

    // Inicializar gráfico de pie vacío
    this.pieChartData = {
      labels: ['Warning', 'Errores', 'Éxitos'],
      datasets: [
        {
          data: [0, 0, 0],
          backgroundColor: ['#FFA726', '#EF5350', '#66BB6A'],
          hoverBackgroundColor: ['#FFB74D', '#E57373', '#81C784'],
        },
      ],
    };

    this.pieChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: '#ffffff' },
        },
      },
    };

    this.sidebarState.sidebarVisible$.subscribe(
      (visible) => (this.sidebarVisible = visible)
    );
  }

  ngOnInit() {
    this.logState.allLogs$.subscribe((logs) => {

      // 📌 1. Pie Chart (Status Totales)
      const success = logs.filter((l) => l.status === 'SUCCESS').length;
      const error = logs.filter((l) => l.status === 'ERROR').length;
      const warning = logs.filter((l) => l.status === 'WARNING').length;

      this.pieChartData = {
        labels: ['Warning', 'Errores', 'Éxitos'],
        datasets: [
          {
            data: [warning, error, success],
            backgroundColor: ['#FFA726', '#EF5350', '#66BB6A'],
            hoverBackgroundColor: ['#FFB74D', '#E57373', '#81C784'],
          },
        ],
      };


      // 📌 2. Combo Chart (Logs y Errores por Mes con datos)
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      // Agrupar por mes solo con datos
      const monthlyTotals: {
        [key: string]: { total: number; errors: number };
      } = {};

      logs.forEach((log) => {
        const date = new Date(log.date);
        const month = monthNames[date.getMonth()];

        if (!monthlyTotals[month]) {
          monthlyTotals[month] = { total: 0, errors: 0 };
        }

        monthlyTotals[month].total++;
        if (log.status === 'ERROR') {
          monthlyTotals[month].errors++;
        }
      });

      const labels = monthNames.filter((m) => monthlyTotals[m]); // Solo meses con datos
      const totalLogsData = labels.map((m) => monthlyTotals[m].total);
      const errorLogsData = labels.map((m) => monthlyTotals[m].errors);

      this.comboChartData = {
        labels,
        datasets: [
          {
            label: 'Errores',
            type: 'line',
            data: errorLogsData,
            fill: false,
            borderColor: '#42A5F5',
            pointBackgroundColor: '#42A5F5',
            tension: 0.4,
          },
          {
            label: 'Logs',
            type: 'bar',
            data: totalLogsData,
            backgroundColor: '#FFA726',
          },
        ],
      };
    });
  }

  showSidebar() {
    this.sidebarState.setSidebarVisible(true);
  }
  hideSidebar() {
    this.sidebarState.setSidebarVisible(false);
  }
}
