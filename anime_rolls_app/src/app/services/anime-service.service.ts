import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  constructor(private http:HttpClient) { }
  populateArray(user):Observable<any>{
    return this.http.get(`${environment.API_URL}/animes/${user}`)
  }
  getRoll():Observable<any>{
    return this.http.get(`${environment.API_URL}/animes/rolls`)
  }
}
