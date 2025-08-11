import { Component } from '@angular/core';
import { UiModule } from '../../shared/ui.module';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { LogServices } from '../../core/services/log-services';
import { LogStateService } from '../../core/services/log-state.service';

@Component({
  selector: 'app-header-menu',
  imports: [UiModule],
  templateUrl: './header-menu.html',
  styleUrl: './header-menu.css',
})
export class HeaderMenu {
  items: any[] = [];
  value: any;

  constructor(
    private logService: LogServices,
    private logState: LogStateService
  ) {}

  search(event: AutoCompleteCompleteEvent) {
    const query = event.query.trim();
    if (query) {
      this.logService.getLogsBySearch(query).subscribe({
        next: (logs) => {
          this.items = logs.map((log) => log.username); // muestra sugerencias
          this.logState.setLogs(logs); // 🔥 Actualiza la tabla
        },
        error: (err) => console.error('Error buscando logs', err),
      });
    }
  }
}
