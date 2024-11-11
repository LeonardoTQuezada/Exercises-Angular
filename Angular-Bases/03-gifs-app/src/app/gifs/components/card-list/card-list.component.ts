import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifts-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent implements OnInit {

  @Input()
  public gifs: Gif[] = [];

  constructor() { }

  ngOnInit() {
  }

}
