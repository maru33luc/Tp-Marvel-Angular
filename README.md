# Trabajo Práctico: Gestión de Personajes de Marvel

## Clonación del Proyecto

- Abre tu terminal
- Navega a la carpeta donde deseas clonar el proyecto
- Clona el repositorio usando el siguiente comando:

``` bash
git clone URL_DEL_REPOSITORIO
```

- Accede al directorio del proyecto
  
``` bash
cd nombre-del-proyecto
```

## Instalación de dependencias

- Una vez que hayas clonado el proyecto, necesitas instalar las dependencias necesarias. Para ello, asegúrate de tener [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/) instalados en tu sistema. Ejecuta el siguiente comando en la terminal dentro del directorio del proyecto:

``` bash
npm install
```

- Este comando leerá el archivo `package.json` y descargará todas las dependencias especificadas en la sección `dependencies`. Las dependencias se almacenarán en una carpeta llamada `node_modules` dentro del directorio del proyecto.

## Descripción

Desarrollar una aplicación en Angular que permita gestionar una base de datos de personajes de Marvel. La aplicación debe conectarse a un backend simulado usando JSON Server y permitir operaciones básicas de creación, visualización, edición y eliminación de personajes. Cada personaje tendrá un nombre, una imagen y un rol.

## Objetivos

- Aprender a utilizar **Formularios Reactivos** con Angular y aplicar validaciones básicas utilizando `Validators`.
- Implementar operaciones HTTP mediante **HTTPClient** para gestionar datos de personajes en JSON Server.

---

### Funcionalidades Requeridas

1. **Visualización de Personajes**

   - Mostrar una lista de personajes de Marvel, incluyendo su nombre, rol y una imagen.
   - La imagen debe cargarse desde una URL proporcionada en la base de datos de JSON Server.

2. **Registro de Nuevo Personaje**

   - Implementar un formulario reactivo para agregar nuevos personajes de Marvel.

   - **Campos del Formulario:**

     - **Nombre:** Campo obligatorio.
     - **Rol:** Campo obligatorio (ej., "Héroe", "Villano", "Anti-héroe").
     - **URL de la Imagen:** Campo obligatorio que valide que el valor es una URL válida.

   - **Validaciones Simples** usando `Validators`:
     - `Validators.required` para los campos obligatorios.
     - `Validators.pattern` para validar que la URL de la imagen tenga un formato adecuado.
   - Mostrar mensajes de error debajo de cada campo cuando las validaciones no se cumplan.

3. **Edición de Personajes Existentes**

   - Al seleccionar un personaje en la lista, cargar sus datos en el formulario reactivo para permitir su edición.
   - Permitir modificar cualquier campo, incluyendo la URL de la imagen, y actualizar en el backend.

4. **Eliminación de Personaje**

   - Incluir un botón para eliminar personajes de la lista, con una confirmación antes de proceder.

5. **Conexión con JSON Server**
   - Utilizar `HTTPClient` para realizar operaciones CRUD (GET, POST, PUT, DELETE) sobre los datos de personajes.

#### Ejemplo de Validaciones con `Validators.pattern`

```typescript
import { Validators } from '@angular/forms'; // Configuración del formulario reactivo
this.characterForm = this.fb.group(
{
name: [ '', [ Validators.required, Validators.pattern('^[a-zA-Z ]*$') // Solo letras y espacios ] ],
role: ['', Validators.required],
imageUrl: [ '', [ Validators.required, Validators.pattern('(https?://.*\\.(?:png|jpg|jpeg))') // URL válida que termina en .png, .jpg o .jpeg ] ] });
```

### Consideraciones Técnicas

- **Formularios Reactivos:**  
  Utilizar `FormGroup` y `FormControl` para construir el formulario, aplicando validaciones básicas de Angular Validators (`Validators.required`, `Validators.pattern`).
- **Manejo de Errores:**  
  Incluir manejo de errores HTTP y mostrar un mensaje al usuario si ocurre algún problema con la conexión al backend.

### Extensión Opcional

- Agregar una barra de búsqueda para filtrar personajes por nombre o rol.

## Tips para Implementar Edición y Eliminación

## Edición

**HTML para Editar Personajes:**

- En tu lista de personajes, añade un botón "Editar" junto a cada personaje:

```xml
 <ul>
   @for(character of characters; track $index){
     <li>
       <img [src]="character.imageUrl" alt="{{ character.name }}" width="50">             {{ character.name }} ({{ character.role }})
    <button (click)="editCharacter(character)">Editar</button>
       <button (click)="confirmDelete(character.id)">Eliminar</button>
     </li>
   }
 </ul>
```

**TypeScript para Editar Personajes:**

- En tu componente TypeScript, implementa el método `editCharacter()`:

```typescript
 editCharacter(character) {
    this.characterForm.patchValue(character); // Carga los datos del personaje en el formulario
    this.isEditing = true; // Cambia a modo edición
    this.selectedCharacterId = character.id; // Guarda el ID del personaje seleccionado }

    onSubmit() {
      if (this.isEditing) {
          this.characterService.updateCharacter({ ...this.characterForm.value, id: this.selectedCharacterId }).subscribe({
          next: () => {
           this.loadCharacters(); // Recarga la lista después de actualizar
     this.resetForm(); // Limpia el formulario
     },
    error: (err) => {
     console.error('Error al actualizar el personaje:', err); // Manejo de errores
     } });
      }else {
        // Agrega un nuevo personaje
         this.characterService.addCharacter(this.characterForm.value).subscribe(() => {        this.loadCharacters(); // Recarga la lista después de agregar
          this.resetForm(); // Limpia el formulario
        });
      }
    }
  }
```

## Eliminación

**HTML para Confirmación de Eliminación:**

- Muestra un mensaje cuando se confirma la eliminación:

```xml
  @if(showConfirmDelete){
      <p>¿Estás seguro que deseas eliminar este personaje?</p>
      <button (click)="deleteCharacter(selectedCharacterId)">Sí</button>
      <button (click)="cancelDelete()">No</button>
}
```

**TypeScript para Eliminar Personajes:**

- Implementa los métodos necesarios en tu componente:

```typescript
  confirmDelete(id) {
     this.showConfirmDelete = true; // Muestra el mensaje de confirmación
     this.selectedCharacterId = id; // Guarda el ID del personaje a eliminar
   }

  deleteCharacter(id) {
    this.characterService.deleteCharacter(id).subscribe({
     next: () => {
      this.loadCharacters(); // Recarga la lista después de eliminar
      this.showConfirmDelete = false; // Oculta el mensaje de confirmación
  },
  error: (err) => {
   console.error('Error al eliminar el personaje:', err); // Manejo de errores } }
    );
  }

  cancelDelete() {
    this.showConfirmDelete = false; // Oculta el mensaje sin eliminar }`
  }
```
