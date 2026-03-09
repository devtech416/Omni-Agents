import { Component } from '@angular/core';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  template: `
    <div class="h-full flex items-center justify-center p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 m-6 shadow-sm">
      <div class="text-center max-w-md">
        <div class="size-20 bg-slate-50 dark:bg-slate-800/50 rounded-full inline-flex items-center justify-center mb-6">
          <span class="material-symbols-outlined text-slate-400 text-4xl">construction</span>
        </div>
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Módulo en Construcción</h2>
        <p class="text-slate-500">Esta sección del Centro de Control se activará próximamente. Por ahora, dirige la demo hacia la sección de Prospectos (Leads).</p>
      </div>
    </div>
  `
})
export class PlaceholderComponent {}
