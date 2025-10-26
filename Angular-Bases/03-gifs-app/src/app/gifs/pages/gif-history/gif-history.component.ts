import {  Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifService } from '../../service/gifs.service';
import { GifListComponent } from '../../components/gif-list/gif-list.component';

@Component({
  selector: 'gif-history.component',
  imports: [GifListComponent],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryComponent {
  //  query = inject(ActivatedRoute).params.subscribe((params) =>{
  //   console.log(params['query']);
  //  });

  gifService = inject( GifService);
  query =  toSignal(
    inject(ActivatedRoute).params.pipe(
      map( params => params['query'] ?? 'No query')
    ));

    gifsByKey = computed(() => this.gifService.getHistoryGifs(this.query()));
 }




