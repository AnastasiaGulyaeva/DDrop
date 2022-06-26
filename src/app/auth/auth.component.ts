import { Component, NgZone, OnInit } from '@angular/core';
import { LoginServiceService } from './login-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{
  token: string | null ="";
  name:string | null;
  isLogin: boolean;

  constructor(public loginService: LoginServiceService, private ngZone: NgZone) {
    loginService.name$.subscribe( name => {
      this.ngZone.run( () => {
        this.name = name;
     });
    });
    loginService.isLogin$.subscribe( login => {
      this.ngZone.run( () => {
        this.isLogin = login;
     });
    });
  } 
 
  ngOnInit(): void {
    this.loginService.logIn();
    console.log (localStorage.getItem("accessToken"));
  }

  logOut() {
    this.loginService.logout();
  }
}
