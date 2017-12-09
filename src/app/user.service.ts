import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthState } from './enums/user.enums';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession
} from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk/global';
import * as CognitoIdentity from 'aws-sdk/clients/cognitoidentity';
import * as awsservice from 'aws-sdk/lib/service';
import { environment } from '../environments/environment';

@Injectable()
export class UserService {
  public static REGION = environment.cognito.region;
  public static POOL_DATA = environment.cognito.POOL_DATA;

  private _loginSubject$ = new BehaviorSubject<AuthState>(AuthState.Logout);
  isLogin$: Observable<AuthState> = this._loginSubject$.asObservable();
  authIsLoading$ = new BehaviorSubject<boolean>(false);
  authDidFail$ = new BehaviorSubject<boolean>(false);
  authStatusChanged$ = new Subject<boolean>();
  usuarioRegistrado: CognitoUser;
  loginUrl = `cognito-idp.${UserService.REGION.toLowerCase()}.amazonaws.com/${
    UserService.POOL_DATA.UserPoolId
  }`;
  public cognitoCreds: AWS.CognitoIdentityCredentials;

  constructor(private _http: HttpClient, private router: Router) {}

  getUserPool() {
    return new CognitoUserPool(UserService.POOL_DATA);
  }

  setCognitoCreds(creds: AWS.CognitoIdentityCredentials) {
    return this.getUserPool().getCurrentUser();
  }

  getCognitoCreds() {
    return this.cognitoCreds;
  }

  buildCognitoCreds(idTokenJwt: string) {
    const url = this.loginUrl;
    const logins: CognitoIdentity.LoginsMap = {};
    logins[url] = idTokenJwt;
    const params = {
      IdentityPoolId: UserService.POOL_DATA.UserPoolId,
      Logins: logins
    };
    const serviceConfigs: awsservice.ServiceConfigurationOptions = {};
    const creds = new AWS.CognitoIdentityCredentials(params, serviceConfigs);
    this.setCognitoCreds(creds);
    return creds;
  }

  login({ username, password }) {
    this.authIsLoading$.next(true);
    const loginData = {
      Username: username,
      Password: password
    };
    const loginDetails = new AuthenticationDetails(loginData);
    const userData = {
      Username: username,
      Pool: this.getUserPool()
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(loginDetails, {
      onSuccess: (result: CognitoUserSession) => {
        console.log('id token ', result.getIdToken().getJwtToken());
        AWS.config.credentials = this.buildCognitoCreds(
          result.getIdToken().getJwtToken()
        );
        this._loginSubject$.next(AuthState.Login);
        this.authIsLoading$.next(false);
        this.authDidFail$.next(false);
        this.router.navigateByUrl('/').then(ok => undefined);
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
    this.getUserPool().signUp(
      username,
      password,
      null,
      null,
      (error, result) => {
        if (error) {
          this.authDidFail$.next(true);
          this.authIsLoading$.next(false);
          return;
        }
        this.authDidFail$.next(false);
        this.authIsLoading$.next(false);
        this.usuarioRegistrado = result.user;
      }
    );
  }

  confirmarUsuario({ username, codigo }) {
    this.authIsLoading$.next(true);
    const userData = {
      Username: username,
      Pool: this.getUserPool()
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
    return this.getUserPool().getCurrentUser();
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
          this._loginSubject$.next(AuthState.Logout);
          this.getAuthenticatedUser().signOut();
        }
      },
      err => this._loginSubject$.next(AuthState.Logout)
    );
  }

  getAccessToken(): string | null {
    let accessToken: string | null = null;
    if (this.getAuthenticatedUser() != null) {
      this.getAuthenticatedUser().getSession((err, session) => {
        if (err) {
          console.log("Can't set credentials: " + err);
          accessToken = null;
        } else {
          if (session.isValid()) {
            accessToken = session.getAccessToken().getJwtToken();
          }
        }
      });
    }
    return accessToken;
  }

  getIdToken(): string | null {
    let accessToken: string | null = null;
    if (this.getAuthenticatedUser() != null) {
      this.getAuthenticatedUser().getSession((err, session) => {
        if (err) {
          console.log("Can't set credentials: " + err);
          accessToken = null;
        } else {
          if (session.isValid()) {
            accessToken = session.getIdToken().getJwtToken();
          }
        }
      });
    }
    return accessToken;
  }

  getRefreshToken(): string | null {
    let accessToken: string | null = null;
    if (this.getAuthenticatedUser() != null) {
      this.getAuthenticatedUser().getSession((err, session) => {
        if (err) {
          console.log("Can't set credentials: " + err);
          accessToken = null;
        } else {
          if (session.isValid()) {
            accessToken = session.getIdToken().getJwtToken();
          }
        }
      });
    }
    return accessToken;
  }
}
