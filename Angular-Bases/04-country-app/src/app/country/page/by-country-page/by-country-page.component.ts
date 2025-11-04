import {
  Component,
  inject,
  linkedSignal,
  resource,
  signal,
} from '@angular/core';
import { SearchImputComponent } from '../../components/search-imput/search-imput.component';
import { ListComponent } from '../../components/list/list.component';
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Region } from '../../interfaces/region.type';


function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLowerCase();

  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  };

  return validRegions[queryParam] ?? 'Americas';
}
@Component({
  selector: 'by-country',
  imports: [ ListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';

   selectedRegion = linkedSignal<Region>(() =>
    validateQueryParam(this.queryParam)
  );

    public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  // countryResourse = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async({request}) => {
  //     if ( !request.query) return [];

  //     return await firstValueFrom (
  //       this.countryService.searchByCpountry(request.query)
  //     );
  //   }
  // });

   countryResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {
      console.log({ request: request.region });

      if (!request.region) return of([]);

      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: request.region,
        },
      });

      return this.countryService.searchByRegion(request.region);
    },
  });
}
