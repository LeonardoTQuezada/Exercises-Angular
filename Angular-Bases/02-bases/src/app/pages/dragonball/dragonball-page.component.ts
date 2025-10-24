import { Component, computed, signal } from '@angular/core';

interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  templateUrl: './dragonball-page.component.html',
})
export class DragonballPageComponent {

  name = signal('');
  power = signal(0);

  character = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9001 },
   // { id: 2, name: 'Vegeta', power: 8000 },
    //{ id: 3, name: 'Piccolo', power: 3000 },
    //{ id: 4, name: 'Yamcha', power: 500 },
  ]);
  // powerClasses = computed(() => {
  //   return {
  //     'text-danger': true,
  //   };
  // });

  addCharacter() {
    if  (!this.name() || !this.power() || this.power() <= 0 ){
      return;
    }
    const newCharacter: Character ={
      id: this.character().length +1,
      name: this.name(),
      power: this.power(),
    };

    //this.character().push(newCharacter);
    this.character.update(
      list => [
        ... list, newCharacter
      ]
    )
    this.resetFields();

  }
  resetFields(){
    this.name.set('');
    this.power.set(0);
  }
}
