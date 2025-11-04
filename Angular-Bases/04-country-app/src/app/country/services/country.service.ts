import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private htp = inject(HttpClient);
  private queryCacheCapital= new Map<string, Country[]>();  //cache simple
  private queryCacheCountry= new Map<string, Country[]>();
  private queryCacheRegion= new Map<Region, Country[]>();

  

  searhByCapital(capital: string): Observable<Country[]> {
    capital = capital.trim().toLowerCase();
    if (this.queryCacheCapital.has(capital)) {
      return of(this.queryCacheCapital.get(capital)!);//retornamos el valor cacheado como observable
    }


    return this.htp.get<RESTCountry[]>(`${API_URL}/capital/${capital}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap((countries) => { //operacion secundaria para guardar en cache
        this.queryCacheCapital.set(capital, countries); //guardamos en cache el resultado
      }),
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
    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query)!);//retornamos el valor cacheado como observable
    }
    // console.log(`emitiendo ${query}`);
    // return of([]);  //of pra enviar el arreglo vacio como observable

    return this.htp.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      delay(2000),
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap((countries) => { //operacion secundaria para guardar en cache
        this.queryCacheCountry.set(query, countries); //guardamos en cache el resultado
      }),
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

  searchByRegion(region: Region): Observable<Country[]> {
    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region)!);//retornamos el valor cacheado como observable
    }


    return this.htp.get<RESTCountry[]>(`${API_URL}/region/${region}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap((countries) => { //operacion secundaria para guardar en cache
        this.queryCacheRegion.set(region, countries); //guardamos en cache el resultado
      }),
      catchError((error) => {
        console.log('Error fetching ', error);

        return throwError(
          () => new Error(`No se pudo obtener países con ese query ${region}`)
        );
      })
    );
  }
}
