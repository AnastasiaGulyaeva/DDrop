import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  url: string = "https://www.googleapis.com/upload/drive/v3/files?uploadType=media"
  urlGoogleFile: string = "https://www.googleapis.com/auth/drive.file"
  urlOAuth: string = "https://accounts.google.com/o/oauth2/auth"
  token:string = "";
  name$ = new BehaviorSubject(localStorage.getItem('name'));
  isLogin$: BehaviorSubject<boolean>;

  surname: string = "";
  jwtData: any;

  constructor( private httpClient: HttpClient ) {
    if ( localStorage.getItem("accessToken") === null) {
      this.isLogin$ = new BehaviorSubject<boolean>(false);
    } else {
      this.isLogin$ = new BehaviorSubject<boolean>(true);
    }
  }  

  logIn() {
    window.google.accounts.id.initialize({
      client_id: '583879004406-je9d58rt1j0k3426hji83b0212ughleg.apps.googleusercontent.com',
      callback: data => this.handleCredentialResponse(data)
    });
    window.google.accounts.id.prompt();
  }


  handleCredentialResponse (data:any) {
    this.token = data.credential;
    console.log(data);
    this.jwtData = jwtDecode(this.token);
    console.log(jwtDecode(this.token));
    localStorage.setItem("accessToken", data.credential);
    localStorage.setItem("name", this.jwtData.given_name);
    this.name$.next(localStorage.getItem('name'));
    this.isLogin$.next(true);
  }

  logout() {
    localStorage.clear();
    this.name$.next(localStorage.getItem('name'));
    this.isLogin$.next(false);
  }

  manualLogIn() {
    const httpOptions = {
        client_id: '583879004406-je9d58rt1j0k3426hji83b0212ughleg.apps.googleusercontent.com',
        redirect_uri: 'http://localhost:4200/',
        response_type: 'code',
        scope: 'https://www.googleapis.com/auth/drive.file'
      }
    return this.httpClient.get(this.urlOAuth +'?client_id=' + httpOptions.client_id + '&redirect_uri='+ httpOptions.redirect_uri +  '&scope=' + httpOptions.scope + '&response_type=' + httpOptions.response_type).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }

  loginFiles(token:string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    return this.httpClient.get(this.urlGoogleFile, httpOptions).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }

  uploadFile(file: any): any{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + this.token
      })
    };
    return this.httpClient.post(this.url, file, httpOptions ).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  } 
} 

