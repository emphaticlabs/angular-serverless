import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthState } from './enums/user.enums';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { User } from './interfaces/user.model';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

const POOL_DATA = {
  UserPoolId: 'us-east-2_pY8mZ04uC',
  ClientId: '3k23fenps45v5pdj3ojkohvujn'
};
const poolData = new CognitoUserPool(POOL_DATA);

@Injectable()
export class UserService {
  private _loginSubject$ = new BehaviorSubject<AuthState>(AuthState.Logout);
  isLogin$: Observable<AuthState> = this._loginSubject$.asObservable();
  authIsLoading$ = new BehaviorSubject<boolean>(false);
  authDidFail$ = new BehaviorSubject<boolean>(false);
  authStatusChanged$ = new Subject<boolean>();
  usuarioRegistrado: CognitoUser;

  constructor(private _http: HttpClient, router: Router) {}
  logout() {
    this._loginSubject$.next(AuthState.Logout);
  }

  login() {
    this._loginSubject$.next(AuthState.Login);
  }

  registrarse({ username, password }) {
    this.authIsLoading$.next(true);
    poolData.signUp(username, password, null, null, (error, result) => {
      if (error) {
        this.authDidFail$.next(true);
        this.authIsLoading$.next(false);
        return;
      }
      this.authDidFail$.next(false);
      this.authIsLoading$.next(false);
      this.usuarioRegistrado = result.user;
      console.log('usuario-registrado', this.usuarioRegistrado);
    });
  }

  confirmarUsuario({ username, codigo }) {
    this.authIsLoading$.next(true);
    const userData = {
      Username: username,
      Pool: poolData
    };
    const cognitoUser: CognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(codigo, true, (error, result) => {
      if (error) {
        this.authIsLoading$.next(false);
        this.authDidFail$.next(true);
        return;
      }
      this.authDidFail$.next(false);
      this.authIsLoading$.next(false);
      console.log('conf-result', result);
    });
  }
}
