import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>admin-panel works!</p>`,
  styleUrl: './admin-panel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPanelComponent { }
