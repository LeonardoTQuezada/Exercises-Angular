import { Component, input, output, signal, effect, linkedSignal } from "@angular/core";


@Component({
  selector: 'country-search-imput',
  imports: [],
  templateUrl: './search-imput.component.html',
})
export class SearchImputComponent {
  placeholder = input('Buscar');
  value = output<string>();  // Decorador para emitir eventos hacia el componente padre
  debounceTime = input(1000);
  initialValue = input<string>();
  inputValue = linkedSignal<string>(() => this.initialValue() ?? ''); // señal vinculada para el valor del input linkeado a initialValue

   debounceEffect = effect((onCleanup) => {
    const value = this.inputValue(); //obtenemos el valor actual de inputValue

    const timeout = setTimeout(() => {
      this.value.emit(value);  //emitimos el valor despues del tiempo de espera
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout);  //limpiamos el timeout si el efecto se vuelve a ejecutar antes de que se complete
    });
  });
}
