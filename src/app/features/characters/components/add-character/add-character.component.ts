import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Character } from '../../interfaces/character';
import { CharactersService } from '../../services/characters.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-character',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.css'],
})
export class AddCharacterComponent {

  constructor() { }

  @Input() personajeSeleccionado: Character | null = null;
  @Output() actualizarListado = new EventEmitter<void>();
  fb = inject(FormBuilder);
  characterService = inject(CharactersService)

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ -]*$')]],
    rol: ['', [Validators.required]],
    imagen: ['', [Validators.required, Validators.pattern('(https://.+)')]],
  });

  ngOnChanges(): void {
    if(this.personajeSeleccionado){
      this.form.patchValue(this.personajeSeleccionado);
    }
  }

  enviar(){
    if(this.form.valid && !this.personajeSeleccionado){
      const data = this.form.getRawValue();
      this.agregarPersonaje(data);
    }
    else if(this.form.valid && this.personajeSeleccionado){
      const id = this.personajeSeleccionado?.id;
      this.personajeSeleccionado = this.form.getRawValue();
      this.personajeSeleccionado.id = id;
      this.editarPersonaje(this.personajeSeleccionado);
    }
  }

  agregarPersonaje(personaje: Character){
    this.characterService.postCharacter(personaje).subscribe({
      next: (data: Character) =>{
        console.log('El personaje se ha creado correctamente', data);
        this.form.reset();
        this.actualizarListado.emit();
      },
      error: (error) =>{
        console.log(error);
      }
    })
  }

  editarPersonaje(personaje: Character){
    if(!this.personajeSeleccionado?.id) return;
    this.characterService.updateCharacter(personaje).subscribe({
      next: (data: Character) =>{
        console.log('El personaje se ha actualizado correctamente', data);
        this.personajeSeleccionado = null;
        this.form.reset();
        this.actualizarListado.emit();
      },
      error: (error) =>{
        console.log(error);
      }
    })
  }

}
