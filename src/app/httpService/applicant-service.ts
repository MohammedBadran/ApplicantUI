import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Applicant } from '../model/applicant';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  apiUrl:string="https://localhost:44330/api/Applciant";
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'    ,
      
    })
  } 

  addApplicant(applicant:Applicant):Observable<boolean> {
    let apiUrl=this.apiUrl+"/";
    return this.http.post<boolean>(apiUrl,applicant,this.httpOptions);
  }
  deleteApplicant(id:number):Observable<boolean> {
    let apiUrl=this.apiUrl+"?id="+id;
    return this.http.delete<boolean>(apiUrl);
  }
  upadteApplicant(applicant:Applicant):Observable<boolean> {
    let apiUrl=this.apiUrl+"/";
    return this.http.put<boolean>(apiUrl,applicant,this.httpOptions);
  }
  getApplicantList():Observable<Applicant[]> {
    let apiUrl=this.apiUrl+"/";
    return this.http.get<Applicant[]>(apiUrl,this.httpOptions);
  }
}
