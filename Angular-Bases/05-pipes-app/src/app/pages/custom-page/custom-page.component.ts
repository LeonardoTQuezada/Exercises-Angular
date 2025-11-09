import { Component, signal } from '@angular/core';
import { ToggleCasePipe } from '../pipes/toggle-case.pipe';
import { heroes } from '../../data/hero.data';
import { CanFlyPipe } from '../pipes/canFly.pipe';
import { HeroColorPipe } from "../pipes/heroColor.pipe";
import {  Color, ColorMap, Hero } from '../../interfaces/hero.interface';
import { HeroTextColorPipe } from "../pipes/hero-text-color.pipe";
import { TitleCasePipe } from '@angular/common';
import { HeroCreatorPipe } from '../pipes/hero-creator.pipe';
import { HeroSortByPipe } from '../pipes/hero-sort-by.pipe';
import { HeroFilterPipe } from '../pipes/hero-filter.pipe';
@Component({
  selector: 'app-custom-page',
  imports: [ToggleCasePipe, CanFlyPipe, HeroColorPipe,
    HeroTextColorPipe, TitleCasePipe, HeroCreatorPipe,
    HeroSortByPipe, HeroFilterPipe
  ],
  templateUrl: './custom-page.component.html',
})
export default class CustomPageComponent {
  name = signal('Leonardo');
  upperCase = signal(true);
  heroes = signal(heroes);
  sortBy = signal<keyof Hero | null>(null);

  searchQuery= signal('')
}
