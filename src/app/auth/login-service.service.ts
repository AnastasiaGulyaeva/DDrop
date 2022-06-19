import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  url: string = "https://www.googleapis.com/upload/drive/v3/files?uploadType=media"
  token:string = "";

  constructor( private httpClient: HttpClient ) {}

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
    localStorage.setItem("accessToken", data.credential);
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

