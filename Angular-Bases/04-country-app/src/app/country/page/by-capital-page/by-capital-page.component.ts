import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchImputComponent } from '../../components/search-imput/search-imput.component';
import { ListComponent } from '../../components/list/list.component';
import { CountryService } from '../../services/country.service';
import {  Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-capital-page.component',
  imports: [SearchImputComponent, ListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);


  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal<string>(() => this.queryParam);  // señal vinculada para el valor de la query obtenida de los parámetros de la ruta



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
      console.log( {query: request.query});
      if ( !request.query) return  of([]);
      this.router.navigate(['/country/by-capital'], { // actualizar la URL con el nuevo parámetro de consulta
        queryParams: { query: request.query },  // establecer el parámetro de consulta 'query'
      });
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
