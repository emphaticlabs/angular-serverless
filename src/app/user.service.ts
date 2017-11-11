import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthState } from './enums/user.enums';

@Injectable()
export class UserService {
  private _loginSubject$ = new BehaviorSubject<AuthState>(AuthState.Logout);
  isLogin$: Observable<AuthState> = this._loginSubject$.asObservable();

  constructor(private _http: HttpClient) {}
  logout() {
    this._loginSubject$.next(AuthState.Logout);
  }

  login() {
    this._loginSubject$.next(AuthState.Login);
  }
}
