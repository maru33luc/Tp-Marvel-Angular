import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

constructor(private http: HttpClient) { }

url: string = environment.apiUrl;

getCharacters(): Observable<Character[]> {
  return this.http.get<Character[]>(this.url);
}

postCharacter(character: Character): Observable<Character>{
  return this.http.post<Character>(this.url, character)
}

updateCharacter(character: Character): Observable<Character>{
  return this.http.put<Character>(`${this.url}/${character.id}`, character)
}

deleteCharacter(id: number | undefined): Observable<Character>{
  return this.http.delete<Character>(`${this.url}/${id}`)
}

}
