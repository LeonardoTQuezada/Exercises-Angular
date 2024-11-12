import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: []
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder:string = "";

  @Input()
  public initialValue:string = "";

  @Output()
  public onValue = new EventEmitter<string>();
  @Output()
  public onDebounce = new EventEmitter<string>();


  constructor() { }

  ngOnDestroy(): void {
    this.debouncerSuscription.unsubscribe();
  }

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe( value =>{
      this.onDebounce.emit( value );
    })
  }

  emitValue(value: string): void {
      this.onValue.emit(value);
  }

  onkeyPress( searchTem: string){
    this.debouncer.next( searchTem);
  }

}
