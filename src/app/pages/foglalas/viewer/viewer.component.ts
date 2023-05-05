import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Image } from '../../../shared/models/Image';
import { Idopont } from '../../../shared/models/Idopont';
import { FoglalasService } from '../../../shared/services/foglalas.service';
import { IdopontService } from '../../../shared/services/idopont.service';
import { UserService } from '../../../shared/services/user.service';
import { AuthService } from '../../../shared/services/auth.service';


@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit, OnChanges{
  @Input() imageInput?: Image;
  loggedInUser?: firebase.default.User | null;
  loadedImage?: string;
  fakeArray1 = new Array(8);
  fakeArray2 = new Array(6);
  idopontObject: any = {};
  idoponts: Array<Idopont> = [];

  idopontsForm = this.createForm({
    id: '',
    username : '',
    doktor_id: '',
    date: '',
    ido_ora:0,
    ido_perc:0
  });


  constructor(private fb: FormBuilder, private router: Router, 
    private foglalasService: FoglalasService,
    private idopontService: IdopontService,
    private userService: UserService,
    private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(user => {
      console.log(user);
    this.loggedInUser = user;
    this.idopontsForm.get('username')?.setValue(this.loggedInUser?.uid);
    }, error => {
      console.error(error);
    });
    
    
  }

  ngOnChanges(): void {
    if (this.imageInput?.id) {
      this.idopontsForm.get('doktor_id')?.setValue(this.imageInput.user_name);
      this.foglalasService.loadImage(this.imageInput?.id + '.jpg').subscribe(data => {
        let reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onloadend = () => {
          this.loadedImage = reader.result as string;
        }
      });
      this.idopontService.getIdopontsById(this.imageInput.id).subscribe(idoponts => {
        this.idoponts = idoponts;
      })
    }
  }
  createForm(model: Idopont) {
    let formGroup = this.fb.group(model);
    //formGroup.get('username')?.addValidators([Validators.required]);
    formGroup.get('doktor_id')?.addValidators([Validators.required]);
    formGroup.get('date')?.addValidators([Validators.required]);
    formGroup.get('ido_ora')?.addValidators([Validators.required, Validators.min(0), Validators.max(23)]);
    formGroup.get('ido_perc')?.addValidators([Validators.required, Validators.min(0), Validators.max(59)]);
    
    return formGroup;
  }

  addIdopont() {

    if (this.idopontsForm.valid) {
      if (this.idopontsForm.get('username') && this.idopontsForm.get('doktor_id') && this.idopontsForm.get('date')) {
       

        // SPREAD OPERATOR
        //this.idoponts.push({ ...this.idopontsForm.value });

        
        // Object
        //this.idoponts.push(Object.assign({}, this.idopontObject));
        this.idopontService.create(this.idopontsForm.value).then(_ => {
          this.router.navigateByUrl('/gallery/successful/' + this.idopontsForm.get('username')?.value);
        }).catch(error => {
          console.error(error);
        });
      }
    }

  }
}
