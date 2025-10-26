import { AfterViewInit, Component, ElementRef, inject,  viewChild } from '@angular/core';

import { GifService } from '../../service/gifs.service';
import { ScrollStateService } from 'src/app/shared/service/scroll-state.service';

// const imageUrls: string[] = [
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
//     "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
// ];


@Component({
  selector: 'trending-page',
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent  implements AfterViewInit {

  //para poner el scroll en la posicion
  ngAfterViewInit(): void {
     const scrollDiv = this.scrollDivRef()?.nativeElement;
     if(!scrollDiv) return;
     scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }



  gifService = inject( GifService);
  scrollStateService = inject(ScrollStateService);

  // gifs = computed( () => this.gifService.trendingGifs());

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  onScroll(event: Event){
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;
    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    this.scrollStateService.trendingScrollState.set(scrollTop);

    if(isAtBottom){
      this.gifService.loadTrendingGifs();
    }

  }

}
