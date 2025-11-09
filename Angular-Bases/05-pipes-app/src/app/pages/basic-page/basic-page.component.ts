import {
  DatePipe,
  LowerCasePipe,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { Component, effect, inject, LOCALE_ID, signal } from '@angular/core';
import { AvailableLocale, LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-basic-page',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: './basic-page.component.html',
})
export default class BasicPageComponent {

  localeService = inject(LocaleService);
  currentLocale = signal(inject(LOCALE_ID)); // inyectamos el LOCALE_ID para obtener el locale actual

  nameLower = signal('leonardo');
  nameUpper = signal('LEONARDO');
  fullName = signal('leoNardO TiniTana');

  customDate = signal(new Date());
  //para que funcione el efecto de actualizar la fecha cada segundo
  tickingDateEffect = effect((onCleanup) => {
    const interval = setInterval(() => {
      this.customDate.set(new Date());
      console.log('Tick Tock', this.customDate());
    }, 1000);

    onCleanup(() => {
      clearInterval(interval);
    });
  });

   changeLocale(locale: AvailableLocale) {
    console.log({ locale });
    this.localeService.changeLocale(locale);
  }

}
