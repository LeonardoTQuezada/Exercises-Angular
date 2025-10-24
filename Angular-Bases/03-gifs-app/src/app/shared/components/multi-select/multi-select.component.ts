import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shared-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  cities = [
    { label: 'New York', value: 'New York' },
    { label: 'Rome', value: 'Rome' },
    { label: 'London', value: 'London' },
    { label: 'Istanbul', value: 'Istanbul' },
    { label: 'Paris', value: 'Paris' },
  ];

  // Valores seleccionados
  selectedCities: string[] = [];
}
