import { Component, EventEmitter, Output,Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  @Output() selectedPage: EventEmitter<string> = new EventEmitter();
  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();
  @Input() loggedInUser?: firebase.default.User | null;
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();


  menuSwitch(page: string) {
    if(page==="logout"){
      this.onLogout.emit(true);
    }
    this.selectedPage.emit(page);
    this.onCloseSidenav.emit(true);
  }
}
