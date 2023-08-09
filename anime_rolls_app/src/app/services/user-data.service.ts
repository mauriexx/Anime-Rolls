import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  url = 'https://api.myanimelist.net/v2/users/mauriex/animelist'
  CLIENT_ID = "702259049ab21a57b626e18276e65a7b"
  requestOptions = {
    headers: {'X-MAL-CLIENT-ID': '702259049ab21a57b626e18276e65a7b'}
  };

  constructor(private http:HttpClient) { }
  users(){
    return this.http.get(this.url, this.requestOptions);
  }

}