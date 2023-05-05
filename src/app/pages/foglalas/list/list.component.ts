import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnChanges{
  @Input() foglalasObjectInput?: Array<any>;
  @Output() imageObjectEmitter: EventEmitter<any> = new EventEmitter();
  chosenImage: any;

  constructor() { }

  ngOnChanges() {
    if (this.foglalasObjectInput) {
      this.chosenImage = this.foglalasObjectInput[0];
      this.reload();
    }
  }

  ngOnInit(): void {
       
  }

  reload() {
    this.imageObjectEmitter.emit(this.chosenImage);
  }

}
