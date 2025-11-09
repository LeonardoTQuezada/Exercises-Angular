import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-numbers-page',
  imports: [
    DecimalPipe, PercentPipe, CurrencyPipe,
  ],
  templateUrl: './numbers-page.component.html',
})
export default class NumbersPageComponent {
  totalSalls = signal(2_567_789.5567);
  porcentage = signal(0.4856);

 }
