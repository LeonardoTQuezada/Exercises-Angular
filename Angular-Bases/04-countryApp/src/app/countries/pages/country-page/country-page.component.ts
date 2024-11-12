import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs/operators';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: [
    `img{
          width: 200px;
    }`
  ]
})
export class CountryPageComponent implements OnInit {

  public country? : Country;
  constructor(private activatedRoute: ActivatedRoute,
              private CountriesService: CountriesService,
              private router: Router,
  ) { }

  ngOnInit() {
      this.activatedRoute.params
        .pipe(
            switchMap( ({id} )=> this.CountriesService.searchContryByAlphaCode( id ) )
        )
        .subscribe( country => {
            if( !country ){
                return this.router.navigateByUrl('');
            }
            return this.country= country;
        })
  }

}
