import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { delay, Observable, of, tap } from 'rxjs';
import { Product, ProductsResponse } from '../interfaces/product.interface';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);
  private productsCache = new Map<string, ProductsResponse>();
  private productCache = new Map<string, Product>();

  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 9, offset = 0, gender = '' } = options; //desestrocturamos para mayor facilidad e incluso poniendo valores por defecto

    const key = `${limit}-${offset}-${gender}`; // 9-0-''

    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!);
    }

    return this.http
      .get<ProductsResponse>(`${baseUrl}/products`, {
        params: {
          limit,
          offset,
          gender,
        },
      }) //para hacer la petición a la bbdd
      .pipe(
        tap((resp) => console.log(resp)),
        tap((resp) => this.productsCache.set(key, resp)) //guardamos a respuesta
      );
  }

  getProductByIdSlug(idSlug: string): Observable<Product> {
     if (this.productCache.has(idSlug)) {
      return of(this.productCache.get(idSlug)!);
    }

    return this.http
    .get<Product>(`${baseUrl}/products/${idSlug}`) //para hacer la petición a la bbdd
    .pipe(tap((product) => this.productCache.set(idSlug, product))); //almacenamos el producto
  }
}
