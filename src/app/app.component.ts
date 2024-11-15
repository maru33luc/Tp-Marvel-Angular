import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListCharactersComponent } from './features/characters/components/list-characters/list-characters.component';
import { DashboardPageComponent } from './features/dashboard/pages/dashboard-page/dashboard-page.component';
import { NavBarComponent } from './shared/components/navBar/navBar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DashboardPageComponent, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tp-marvel';



}
