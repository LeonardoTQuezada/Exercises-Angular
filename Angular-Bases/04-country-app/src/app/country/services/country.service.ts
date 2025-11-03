import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private htp = inject(HttpClient);

  searhByCapital(capital: string): Observable<Country[]> {
    capital = capital.trim().toLowerCase();

    return this.htp.get<RESTCountry[]>(`${API_URL}/capital/${capital}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      catchError((error) => {
        console.log('Error fetching ', error);

        return throwError(
          () => new Error(`No se pudo obtener países con ese query ${capital}`)
        );
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.trim().toLowerCase();

    return this.htp.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      delay(2000),
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      catchError((error) => {
        console.log('Error fetching ', error);

        return throwError(
          () => new Error(`No se pudo obtener países con ese query ${query}`)
        );
      })
    );
  }

  searchByCountryByAlphaCode(code: string): Observable<Country | null> {
    code = code.trim().toLowerCase();

    return this.htp.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map((resp) =>  CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      map(countries => countries.at(0)  || null),
      catchError((error) => {
        console.log('Error fetching ', error);

        return throwError(
          () => new Error(`No se pudo obtener países con ese código ${code}`)
        );
      })
    );
  }

  searchByRegion(region: string): Observable<Country[]> {
    region = region.trim().toLowerCase();

    return this.htp.get<RESTCountry[]>(`${API_URL}/region/${region}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      catchError((error) => {
        console.log('Error fetching ', error);

        return throwError(
          () => new Error(`No se pudo obtener países con ese query ${region}`)
        );
      })
    );
  }
}
