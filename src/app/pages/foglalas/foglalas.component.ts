import { Component, OnInit, Input } from '@angular/core';
import { Image } from '../../shared/models/Image';
import { FoglalasService } from '../../shared/services/foglalas.service';


@Component({
  selector: 'app-foglalas',
  templateUrl: './foglalas.component.html',
  styleUrls: ['./foglalas.component.css']
})
export class FoglalasComponent implements OnInit {
  @Input() loggedInUser?: firebase.default.User | null;
  
  foglalasObject?: Array<Image>;
  chosenImage?: Image;

  constructor(private foglalasService: FoglalasService) { }

  ngOnInit(): void {
    this.foglalasService.loadImageMeta('__credits.json').subscribe((data: Array<Image>) => {
      this.foglalasObject = data;
   })
  }

  loadImage(imageObject: Image) {
    this.chosenImage = imageObject;
  }
}
