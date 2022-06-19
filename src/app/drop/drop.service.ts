import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DropService {

  // url: string = "https://www.googleapis.com/upload/drive/v3/files?uploadType=media"
  // token:string = "";

  // const httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type':  'application/json',
  //     Authorization: this.token
  //   })
  // };

  // constructor( private httpClient: HttpClient) { }

  // uploadFile(file: any, token: string) Observable<any> {
  //   return this.httpClient.post(this.url, file, httpOptions ).subscribe(
  //     (response) => console.log(response),
  //     (error) => console.log(error)
  //   )
  // } 
}
