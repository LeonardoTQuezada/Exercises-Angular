import { Pipe, type PipeTransform } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Pipe({
  name: 'heroSortBy',
})
export class HeroSortByPipe implements PipeTransform {
  transform(value: Hero[], shortBy: keyof Hero | null): Hero[] {
    if (!shortBy) return value;

    switch (shortBy) {
      case 'name':
        return value.sort((a, b) => a.name.localeCompare(b.name));
      case 'color':
        return value.sort((a, b) => a.color - b.color);
      case 'canFly':
        return value.sort((a, b) => (a.canFly ? 1 : -1) - (b.canFly ? 1 : -1));
      case 'creator':
        return value.sort((a, b) => a.creator - b.creator);
      default:
         return value;
    }

    return [];
  }
}
