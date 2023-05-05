import { Component, OnChanges, OnInit } from '@angular/core';
import { Idopont } from '../../shared/models/Idopont';
import { IdopontService } from '../../shared/services/idopont.service';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnChanges, OnInit {

  loggedInUser?: firebase.default.User | null;
  idoponts: Array<Idopont> = [];
  users: Array<User> = [];

  constructor(
    private idopontService: IdopontService,
    private userService: UserService,
    private authService: AuthService
    ) { }
    ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(user => {
    this.loggedInUser = user;
    this.userService.getUsersById(this.loggedInUser?.uid as string).subscribe(users => {
      this.users = users;
      console.log(this.loggedInUser?.uid as string);
    });
    this.idopontService.getIdopontsByUserId(this.loggedInUser?.uid as string).subscribe(idoponts => {
      this.idoponts = idoponts;
      console.log(idoponts);
    })
    
    }, error => {
      console.error(error);
    });
    
  }

  ngOnChanges(): void {
    console.log("benne");
    
  }

}
