import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "shared-loading-spinner",
  templateUrl: "./loading-spinner.component.html",
  styleUrls: ["./loading-spinner.component.css"],

})
export class LoadingSpinnerComponent implements OnInit {
  @Input()
  public url: string;
  @Input()
  public alt: string = "";

  public hasLoaded: boolean = false;

  constructor() {}

  ngOnInit(): void {
    //if( !this.url ) throw new Error("URL property is required");
  }

  onLoad() {
    setTimeout(() => {}, 1000);
    this.hasLoaded = true;
  }
}
