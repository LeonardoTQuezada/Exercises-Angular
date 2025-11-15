import { ProductCarouselComponent } from '@/products/component/product-carousel/product-carousel.component';
import { ProductsService } from '@/products/service/products.service';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  imports: [ProductCarouselComponent],
  templateUrl: './product-page.component.html',
  styles: ``,
})
export class ProductPageComponent {

  activatedRoute = inject(ActivatedRoute);  // para tomar la ruta activa
  productsService = inject(ProductsService);


  productIdSlug = this.activatedRoute.snapshot.params['idSlug'];  //para obtener el idslug de la url

  productResource = rxResource({
    request: () => ({ idSlug: this.productIdSlug }),
    loader: ({ request }) => {
      return this.productsService.getProductByIdSlug(request.idSlug);
    },
  });
}
