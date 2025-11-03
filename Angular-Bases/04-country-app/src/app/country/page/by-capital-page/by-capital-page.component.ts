import { Component, inject, resource, signal } from '@angular/core';
import { SearchImputComponent } from '../../components/search-imput/search-imput.component';
import { ListComponent } from '../../components/list/list.component';
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-capital-page.component',
  imports: [SearchImputComponent, ListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);
  query = signal('');
  // resource con promesas
  // countryResourse = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async({request}) => {
  //     if ( !request.query) return [];

  //     return await firstValueFrom (
  //       this.countryService.searhByCapital(request.query)
  //     );
  //   }
  // });

 countryResourse =  rxResource({
    request: () => ({ query: this.query() }),
    loader: ({request}) => {
      if ( !request.query) return  of([]);

      return  this.countryService.searhByCapital(request.query)
    }
  });



      // isLoading = signal(false);
  // isError = signal(<string | null>null);
  // countries = signal<Country[]>([]);

  // onSearchCapital(capital: string) {
  //   if (this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searhByCapital(capital).subscribe({
  //     next: (countries) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);


  //       // const c = CountryMapper.mapResetCountryArrayToCountry(resp);
  //       // console.log(c); una manera de añadir el mapper
  //     },
  //     error: (err) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       //this.isError.set(`No se encontró ningún país con esa capital: ${capital}`); cuando no va en el service
  //       this.isError.set(err);

  //     },
  //   });
  // }


}
