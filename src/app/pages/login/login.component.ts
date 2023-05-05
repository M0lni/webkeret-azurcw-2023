import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  email = new FormControl('');
  password = new FormControl('');

  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;

  loading: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }
  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe();
  }

  async login() {
    this.loading = true;
  this.authService.login(this.email.value as string, this.password.value as string).then(cred => {
    console.log(cred);
    this.router.navigateByUrl('/main');
    this.loading = false;
  }).catch(error => {
    console.error(error);
    this.loading = false;
  });

    
  }
}
