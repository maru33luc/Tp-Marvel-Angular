import { Character } from './../../interfaces/character';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CharactersService } from '../../services/characters.service';
import { AddCharacterComponent } from '../add-character/add-character.component';

@Component({
  selector: 'app-list-characters',
  standalone: true,
  imports: [AddCharacterComponent],
  templateUrl: './list-characters.component.html',
  styleUrls: ['./list-characters.component.css']
})
export class ListCharactersComponent implements OnInit {

  constructor(private characterService: CharactersService) { }

  ngOnInit() {
    this.traerPersonajes()
  }

  personajeSeleccionado: Character | null = null;

  characters: Character[] = [];

  traerPersonajes() {
    this.characterService.getCharacters().subscribe({
      next: (data: Character[]) => {
        this.characters = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    })
}

  eliminarPersonaje(id: number | undefined){
    if(!id) throw new Error('Id is required');
    this.characterService.deleteCharacter(id).subscribe({
      next: () => {
        this.traerPersonajes();
      }
    })
  }

  editarPersonaje(character: Character){
    this.personajeSeleccionado=character
    this.personajeSeleccionado.id = character.id;
  }

  actualizarListado(){
    this.traerPersonajes();
  }

}
