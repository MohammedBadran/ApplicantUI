import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CountryNameValidatorService {
  countryName:string=''
  apiUrl:string='https://localhost:44330/api/Applciant/ValidateCountryName?countryName='
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  }
  getCountryName(countryName:string):Observable<any> {
    
    let apiUrl=this.apiUrl+countryName;
    return this.http.get<any>(apiUrl,this.httpOptions);
  }
}
