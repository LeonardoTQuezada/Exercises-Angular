import { Component, inject} from '@angular/core';

import { CharacterAddComponent } from "../../components/dragonball/character-add/character-add.component";
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list.component";
import { DragonBallService } from '../../service/dragonball.service';


@Component({
  templateUrl: './dragonball-super-page.component.html',
  selector: 'dragonball-super',
  imports: [CharacterAddComponent, CharacterListComponent],
})
export class DragonballSuperPageComponent {


//lo antiguo
  //  constructor(public dragonballService: DragonBallService){}
     // addCharacter(){
    //   this.dragonballService.addCharacter
    // }
//lo nuevo
public dragonballService = inject(DragonBallService);



}
