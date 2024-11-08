import { Component, OnInit } from '@angular/core';
import { ListCharactersComponent } from '../../../characters/components/list-characters/list-characters.component';
import { AddCharacterComponent } from '../../../characters/components/add-character/add-character.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [ListCharactersComponent],
  template: `

    <app-list-characters></app-list-characters>
  `,
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
