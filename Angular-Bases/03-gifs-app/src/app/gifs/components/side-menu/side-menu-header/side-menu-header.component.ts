import {  Component } from '@angular/core';
import { environment } from '@environments/environment';
//import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'gif-side-menu-header',
  templateUrl: './side-menu-header.component.html',

})
export class SideMenuHeaderComponent {
  envs = environment
}
