import { AfterViewInit, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

mapboxgl.accessToken = environment.mapboxKey;

interface Marker {
  id: string;
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
})
export class MiniMapComponent implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');

  lngLat = input.required<{ lng: number; lat: number }>();  // el input para pedir algo al padre
  zoom = input<number>(14);

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat(), // starting position [lng, lat]
      zoom: this.zoom(),
      interactive: false,  // para que el mapa  no sea interactivo
      pitch: 30,
    });
    //this.map.set(map); para que salga solo el mapa
    new mapboxgl.Marker().setLngLat(this.lngLat()).addTo(map);//para que se cree el mapa con el localizador

  }
}
