import { ChangeDetectionStrategy, Component, signal } from "@angular/core";



@Component({
  selector: 'app-counter',
 templateUrl: './counter-page.component.html',
 styles: `
  button{
    margin: 5px 10px;
    padding:5px;
    width: 75px;
  }

 `,
 //changeDetection: ChangeDetectionStrategy.OnPush,

})

export class CounterPageComponent {


  counter = 10;
  counterSignal = signal(10);
  title: string = 'Counter App';


  constructor(){
    // setInterval( () => {
    //    // this.counter += 1;
    //    this.counterSignal.update( (v) => v + 1 );
    //     console.log('Tick');
    // }, 2000);
  }

  resetCounter(){
    this.counter = 0;
    this.counterSignal.set(0);
  }

  increaseBy(value: number){
    this.counter += value;
    //this.counterSignal.set(this.counterSignal() + value) ;
    this.counterSignal.update( current => current + value );
  }
}
