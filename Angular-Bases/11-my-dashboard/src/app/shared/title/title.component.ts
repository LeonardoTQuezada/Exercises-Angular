import { booleanAttribute, Component, input } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
   template: `
  <h1 class="text-3xl mb-5">{{ title()  }} - {{withShadow()}}</h1>
  `
})
export class TitleComponent {

  title = input.required<string>();
   withShadow = input(false, { transform: booleanAttribute });
  //   @Input({ required: true }) title!: string;
  // @Input({ transform: booleanAttribute }) withShadow:boolean = false;
}
