import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthState } from './enums/user.enums';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { User } from './interfaces/user.model';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession
} from 'amazon-cognito-identity-js';
import { Observer } from 'rxjs/Observer';

const POOL_DATA = {
  UserPoolId: 'us-east-2_HiGIW53Kp',
  ClientId: '4be4epattcj2vkhpbp7es2q7oe'
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

  login({ username, password }) {
    console.log('username', username, 'pass', password);
    this.authIsLoading$.next(true);
    const loginData = {
      Username: username,
      Password: password
    };
    const loginDetails = new AuthenticationDetails(loginData);
    const userData = {
      Username: username,
      Pool: poolData
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(loginDetails, {
      onSuccess: (result: CognitoUserSession) => {
        console.log(result);
        this._loginSubject$.next(AuthState.Login);
        this.authIsLoading$.next(false);
        this.authDidFail$.next(false);
      },
      onFailure: err => {
        console.log(err);
        this._loginSubject$.next(AuthState.Logout);
        this.authIsLoading$.next(false);
        this.authDidFail$.next(true);
        return;
      }
    });
  }

  registrarse({ username, passGroup: { password: password } }) {
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

  getAuthenticatedUser() {
    return poolData.getCurrentUser();
  }

  isAuthenticated(): Observable<AuthState> {
    const user = this.getAuthenticatedUser();
    if (!user) {
      this._loginSubject$.next(AuthState.Logout);
    } else {
      user.getSession((err, session) => {
        if (err) {
          this._loginSubject$.next(AuthState.Logout);
        } else {
          if (session.isValid()) {
            this._loginSubject$.next(AuthState.Login);
          } else {
            this._loginSubject$.next(AuthState.Logout);
          }
        }
      });
    }
    return this.isLogin$;
  }

  logout() {
    this.isAuthenticated().subscribe(
      next => {
        if (next === AuthState.Logout) {
          return;
        } else {
          this.getAuthenticatedUser().signOut();
          this._loginSubject$.next(AuthState.Logout);
        }
      },
      err => this._loginSubject$.next(AuthState.Logout)
    );
  }
}
