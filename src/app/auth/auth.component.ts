import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from './login-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  message: string ="";
  name: string ="";
  token: string | null ="";

  constructor(public loginService: LoginServiceService) {}

  ngOnInit(): void {
   this.loginService.logIn();
  }
}
