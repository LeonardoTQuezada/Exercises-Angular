import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable, of, tap } from 'rxjs';
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

   getProducts(options: Options): Observable<ProductsResponse>{
      const { limit = 9, offset = 0, gender = '' } = options; //desestrocturamos para mayor facilidad e incluso poniendo valores por defecto

      return this.http .get<ProductsResponse>(`${baseUrl}/products`, {
        params: {
          limit,
          offset,
          gender,
        },
      })    //para hacer la petición a la bbdd
       .pipe(tap((resp) => console.log(resp)));
   }

   getProductByIdSlug(idSlug: string): Observable<Product>{
       return this.http.get<Product>(`${baseUrl}/products/${idSlug}`) ;   //para hacer la petición a la bbdd

   }
}
