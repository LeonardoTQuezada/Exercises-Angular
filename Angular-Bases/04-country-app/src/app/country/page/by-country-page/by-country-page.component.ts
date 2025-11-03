import { Component, inject, resource, signal } from '@angular/core';
import { SearchImputComponent } from "../../components/search-imput/search-imput.component";
import { ListComponent } from "../../components/list/list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'by-country',
  imports: [SearchImputComponent, ListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);
  query = signal('');
  // countryResourse = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async({request}) => {
  //     if ( !request.query) return [];

  //     return await firstValueFrom (
  //       this.countryService.searchByCpountry(request.query)
  //     );
  //   }
  // });

   countryResourse =  rxResource({
    request: () => ({ query: this.query() }),
    loader: ({request}) => {
      if ( !request.query) return  of([]);

      return  this.countryService.searchByCountry(request.query)
    }
  });
 }
