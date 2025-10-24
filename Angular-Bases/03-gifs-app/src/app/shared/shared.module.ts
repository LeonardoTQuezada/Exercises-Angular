import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LazyImageComponent } from './components/lazy-image/lazy-image.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import {MultiSelectModule} from 'primeng/multiselect';
import {MenuItem} from 'primeng/api';

@NgModule({
  declarations: [SidebarComponent, LazyImageComponent, MultiSelectComponent,],
  imports: [
    CommonModule,
    MultiSelectModule,
  ],
  exports:[
    SidebarComponent,
    LazyImageComponent,
    MultiSelectComponent
  ]
})
export class SharedModule { }
