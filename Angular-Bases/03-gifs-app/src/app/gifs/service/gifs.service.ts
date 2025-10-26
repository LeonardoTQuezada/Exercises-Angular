import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap, Observable } from 'rxjs';

const GIF_KEY = 'gifs';
const loadFromlocalStorage = () => {
  const gifsFormLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  const gifs = JSON.parse(gifsFormLocalStorage);
  return gifs;
}

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient); // aqui inyectamos
  trendingGifs = signal<Gif[]>([]);
  // searchsGifs = signal<Gif[]>([]);

  trendingGifsLoading = signal(true);
  searchHistory = signal<Record<string, Gif[]>>(loadFromlocalStorage());

  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));
  constructor() {
    this.loadTrendingGifs();
    console.log('Servicio Creado');
  }

  loadTrendingGifs() {
    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
        },
      })
      .subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemToGifArray(resp.data);
        this.trendingGifs.set(gifs);
        this.trendingGifsLoading.set(false);
        console.log({ gifs });
      });
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
          q: query,
        },
      })
      .pipe(
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemToGifArray(items)),
        //Historial
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase()]: items,
          }));
        })
      );

    // .subscribe( (resp) =>{
    //    const gifs = GifMapper.mapGiphyItemToGifArray(resp.data);
    //    this.searchsGifs.set(gifs);
    //     console.log({search: gifs})
    // });
  }

  getHistoryGifs(query: string) {
    return this.searchHistory()[query] ?? [];
  }

  saveGifsToLocalStorage = effect(() => {
    const historyString=  JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY, historyString);
  });
}


