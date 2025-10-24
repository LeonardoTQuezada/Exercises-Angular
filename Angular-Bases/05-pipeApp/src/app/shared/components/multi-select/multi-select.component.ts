import { Component, OnInit } from '@angular/core';

import { SelectItem } from 'primeng/api';
@Component({
  selector: 'shared-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css'
  ],


})



export class MultiSelectComponent  {

  cities1: SelectItem[];

  selectedCities2: City[] = [];

  selectedCities1: City[];

  cities2: City[]  =[
    {name: 'New York', code: 'NY'},
    {name: 'Rome', code: 'RM'},
    {name: 'London', code: 'LDN'},
    {name: 'Istanbul', code: 'IST'},
    {name: 'Paris', code: 'PRS'}
];;
  //selectedCities2: any[] = [];
  constructor() {
      //SelectItem API with label-value pairs
      this.cities1 = [
          {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
          {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
          {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
          {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
          {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
      ];


  }
  onSelectionChange(event: any) {
    console.log('Selected items:', this.selectedCities2);
  }

  removeItem(item: any) {
    this.selectedCities2 = this.selectedCities2.filter(i => i !== item);
  }
}
