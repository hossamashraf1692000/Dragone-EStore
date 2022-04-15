import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import jwtDecode from 'jwt-decode';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL:any = 'https://api.dragonestore.tk/';
  currentUserData:any = new BehaviorSubject(null);
  
  encodeToken:any = localStorage.getItem('currentUser');    
  headers:any = new HttpHeaders().set('Authorization', 'Bearer'+this.encodeToken);

  constructor(private _HttpClient:HttpClient)
  {    
    if(localStorage.getItem('currentUser'))
    {
      this.saveUserData();
      if (localStorage.getItem('updatedData')) 
      {
        let userData = localStorage.getItem('updatedData');
        this.currentUserData.next(JSON.parse(userData!))
      }  
    }
  }

  register(formData:any):Observable<any>
  {
    const headers = new HttpHeaders()
    .set('Accept','application/json');
    return this._HttpClient.post(this.baseURL+'auth/register', formData, {headers:headers});
  }

  login(loginData:any):Observable<any>
  {
    return this._HttpClient.post(this.baseURL+'auth/login', loginData);
  }

  updateProfile(profileData:any):Observable<any>
  {

    return this._HttpClient.post(this.baseURL+'profile', profileData, {headers:this.headers});
  }

  updatePassword(passwordData:any):Observable<any>
  {
    return this._HttpClient.post(this.baseURL+'profile/change-password', passwordData, {headers:this.headers});
  }

  saveUserData()
  {
    let encodeToken:any = localStorage.getItem('currentUser');
    let decodeToken:any = jwtDecode(encodeToken);
    this.currentUserData.next(decodeToken);
    // console.log(this.currentUserData.getValue().user);
    
  }




}
