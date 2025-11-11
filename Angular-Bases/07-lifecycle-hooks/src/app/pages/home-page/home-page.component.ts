import {
  afterNextRender,
  afterRender,
  Component,
  effect,
  signal,
} from '@angular/core';
import { TitleComponent } from '../../component/title/title.component';

const log = (...messages: string[]) => {
  console.log(
    `${messages[0]} %c${messages.slice(1).join(', ')} `,
    'color: #0062f5ff'
  );
};

@Component({
  selector: 'home-page',
  imports: [TitleComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  traditionalProperty = 'Leonardo';
  signalProperty = signal('Leonardo');

  constructor() {
    log('Constructor llamado');

    // setTimeout(() => {
    //   this.signalProperty.set('Juan Carlos');
    // }, 2000);
  }

  changeTraditional() {
    this.traditionalProperty = 'Leonardo Tinitana';
  }

  changeSignal() {
    this.signalProperty.set('Leonardo Tinitana');
  }

  basicEffect = effect((onCleanup) => {
    log('effect', 'Disparar efectos secundarios');

    onCleanup(() => {
      log('onCleanup', 'Se ejecuta cuando el efecto se va a destruir');
    });
  });

  ngOnInit() {
    log(
      'ngOnInit: ',
      'Se ejecuta una vez después de que Angular haya inicializado todas las entradas del componente.'
    );
  }

  ngOnChanges() {
    log(
      'ngOnChanges: ',
      'Se ejecuta cada vez que cambian las entradas del componente.'
    );
  }

  ngDoCheck() {
    log(
      'ngDoCheck: ',
      'Se ejecuta cada vez que se comprueba si este componente ha sufrido cambios.'
    );
  }

  ngAfterContentInit() {
    log(
      'ngAfterContentInit: ',
      'Se ejecuta una vez después de que se haya inicializado el contenido del componente.'
    );
  }

  ngAfterContentChecked() {
    log(
      'ngAfterContentChecked: ',
      'Se ejecuta cada vez que se comprueba si hay cambios en el contenido de este componente.'
    );
  }

  ngAfterViewInit() {
    log(
      'ngAfterViewInit: ',
      'Se ejecuta una vez después de que se haya inicializado la vista del componente.'
    );
  }

  ngAfterViewChecked() {
    log(
      'ngAfterViewChecked: ',
      'Se ejecuta cada vez que se comprueba si hay cambios en la vista del componente.'
    );
  }

  ngOnDestroy() {
    log(
      'ngOnDestroy: ',
      'Se ejecuta una vez antes de que el componente sea destruido.'
    );
  }

  afterNextRenderEffect = afterNextRender(() => {
    log(
      'afterNextRender',
      'Se ejecuta una vez más la próxima vez que todos los componentes se hayan renderizado en el DOM.'
    );
  });

  afterRender = afterRender(() => {
    log(
      'afterRender',
      'Se ejecuta cada vez que todos los componentes se han renderizado en el DOM.'
    );
  });
}
