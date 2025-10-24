import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import {MultiSelectModule} from 'primeng/multiselect';

@NgModule({
  declarations: [
     MenuComponent,
     MultiSelectComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    BrowserAnimationsModule,
    MultiSelectModule
  ],
  exports:[
    MenuComponent,
    MultiSelectComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
