import { Component, inject, linkedSignal, signal } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { CountryService } from '../../services/country.service';
import { Region } from '../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { query } from '@angular/animations';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'by-region',
  imports: [ListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal<string>(() => this.queryParam); // señal vinculada para el valor de la query obtenida de los parámetros de la ruta

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  selectedRegion = signal<Region | null>(null);

  countryResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {
      console.log({ request: request.region });

      if (!request.region) return of([]);
      this.router.navigate(['/country/by-region'], {
        // actualizar la URL con el nuevo parámetro de consulta
        queryParams: { query: request.region }, // establecer el parámetro de consulta 'query'
      });

      return this.countryService.searchByRegion(request.region);
    },
  });
}
