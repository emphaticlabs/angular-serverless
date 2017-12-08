import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { environment } from '../../environments/environment';
import { FixtureBet } from '../interfaces/bet.interfaces';
import { UserService } from '../user.service';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class PronosticosService {
  private api_gateway_url: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.api_gateway_url = environment.api_gateway_url;
  }

  getCognitoAuthenticatedUser() {
    return this.userService.getAuthenticatedUser();
  }

  postPronostico(data: FixtureBet): Observable<any> {
    const wrapperObservable = new Observable((observer: Observer<any>) => {
      this.getCognitoAuthenticatedUser().getSession((err, session) => {
        if (err) {
          console.log('wont got cognito session', err);
          observer.error(err);
        }
        // got cognito session
        observer.next(session);
        observer.complete();
      });
    });
    return wrapperObservable.mergeMap(session => {
      const headers = new HttpHeaders({
        Authorization: session.getIdToken().getJwtToken()
      });
      return this.http.post(this.api_gateway_url, data, { headers });
    });
  }

  getPronosticosList(): any {
    const wrapperObservable = new Observable((observer: Observer<any>) => {
      this.getCognitoAuthenticatedUser().getSession((err, session) => {
        if (err) {
          console.log('wont got cognito session', err);
          observer.error(err);
        }
        // got cognito session
        observer.next(session);
        observer.complete();
      });
    });
    return wrapperObservable.mergeMap(session => {
      const headers = new HttpHeaders({
        Authorization: session.getIdToken().getJwtToken()
      });
      return this.http.get<FixtureBet[]>(this.api_gateway_url, { headers });
    });
  }
}
