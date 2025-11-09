import { Component, signal } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { interval, map, tap } from 'rxjs';
const client1 = {
  name: 'Fernando',
  gender: 'male',
  age: 39,
  address: 'Ottawa, Canada',
};

const client2 = {
  name: 'Melissa',
  gender: 'female',
  age: 25,
  address: 'New York, USA',
};

@Component({
  selector: 'app-uncommon-page',
  imports: [CardComponent, I18nSelectPipe,
    I18nPluralPipe, SlicePipe, JsonPipe,
    UpperCasePipe, KeyValuePipe,
    TitleCasePipe,AsyncPipe,],
  templateUrl: './uncommon-page.component.html',
})
export default class UncommonPageComponent {
  // i18n Select
  client = signal(client1);

  invitationMap = {
      male: 'invitarlo',
      female: 'invitarla',
  };

  changeClient(): void {
    if (this.client() === client1) {
      this.client.set(client2);
      return
    }
    this.client.set(client1);
  }


  // i18n Plural

  clients = signal(['Elena','Maria', 'Pedro', 'Juan', 'Ana', 'Luis', 'Carlos', 'Lucia', 'Leonardo']);

  clientsMap = signal({
    '=0': 'no hay clientes esperando.',
    '=1': 'hay 1 cliente esperando.',
    '=2': 'hay 2 clientes esperando.',
    'other': 'hay # clientes esperando.',
  });

  deleteClient(): void {

    this.clients.update( (prev) => prev.slice(1) );
  }

  // keyValue Pipe

  profile = {
    name: 'Leonardo',
    age: 40,
    address: 'Madrid, España'
  };

  //Async Pipe
  promiseValue: Promise<string> = new  Promise((resolve, reject) =>{
    setTimeout(() => {
      //reject('Tenemos un error en la data');
      resolve('Tenemos data en la promesa.');
      console.log('Promesa finalizada');
    }, 3500);
  });


  myObservableTime = interval(2000).pipe(
    map((value) => value + 1 ),
    tap((value) => console.log('tap', value))
  );
}
