import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import * as _ from 'lodash';
import { FormGroup, FormControl, Validators } from "@angular/forms";


export interface UserDetails {
  _id: string
  user_name: string
  address: string
  mobile_number: number
  email_address: string
  password: string
  companies: Array<Companies>
}

interface Companies {
  name: string
}

export interface Company {
  name: string
}

interface TokenResponse {
  token: string
}

export interface TokenPayload {
  _id: string
  user_name: string
  address: string
  mobile_number: number
  email_address: string
  password: string
  companies: Array<Companies>
}

@Injectable()
export class AuthenticationService {

  baseUri: string = 'http://localhost:5212/';
  private token: string;
  // addressForm: FormGroup;
  addressForm: FormGroup = new FormGroup({
    // this.addressForm = this.fb.group({
    user_name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    mobile_number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    email_address: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])),
    companies: new FormControl([], Validators.required)
  });

  initializeFormGroup() {
    this.addressForm.setValue({
    // _id:'',
    user_name:'',
    address:'',
    mobile_number:'',
    email_address:'',
    password:'',
    companies:'',
  });
}

  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  getEmployees(): Observable<any> {
    return this.http.get(`${this.baseUri}alls/`);
  }
  getAllDetails(): Observable<any> {

    return this.http.get(`/users/comp/`);
    // const token = this.getToken()
    // let payload
    // if (token) {
    //   payload = token.split('.')[1]
    //   payload = window.atob(payload)
    //   return JSON.parse(payload)
    // } else {
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      return true
    } else {
      return false
    }
  }

  public register(user: TokenPayload): Observable<any> {
    let url = `${this.baseUri}/register/`;
    const base = this.http.post(url, user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )

    return request
  }

  public login(user: TokenPayload): Observable<any> {
    let url = `${this.baseUri}/login/`;
    const base = this.http.post(url, user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )

    return request
  }

  public profile(): Observable<any> {
    let url = `${this.baseUri}/`;
    return this.http.get(url, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  // deleteEmployee(_id: string) {
  //  let url = `${this.baseUri}/`;
  // return this.http.delete(url + `/${_id}`);
  // headers: { Authorization: ` ${this.getToken()}` }
  // }
  // public deleteuser(_id): Observable<any> {
  //   let url = `${this.baseUri}/`;
  //   return this.http.delete(url + `/${_id}`);
  //   headers: { Authorization: ` ${this.getToken()}` }
  // }

  deleteEmployee(_id: string) {
    let url = `${this.baseUri}/${_id}`;
    return this.http.delete(url  );
  }


  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }

  populateForm(employee) {
    this.addressForm.setValue(_.omit(employee));
  }


}
