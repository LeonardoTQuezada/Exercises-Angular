import { Component, output, input } from '@angular/core';

@Component({
  selector: 'country-search-imput',
  imports: [],
  templateUrl: './search-imput.component.html',
})
export class SearchImputComponent {
  placeholder = input('Buscar');
 value = output<string>();  // Decorador para emitir eventos hacia el componente padre

}
