import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { environment } from '../../environments/environment';
import { FixtureBet } from '../interfaces/bet.interfaces';
import { UserService } from '../user.service';

@Injectable()
export class PronosticosService {
  private api_gateway_url: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.api_gateway_url = environment.api_gateway_url;
  }

  postPronostico(data: FixtureBet): Observable<any> | any {
    this.userService.getAuthenticatedUser().getSession((err, session) => {
      const headers = new HttpHeaders({
        Authorization: session.getIdToken().getJwtToken()
      });
      if (err) {
        console.log('wont got cognito session', err);
        return Observable.of(null);
      }
      // got cognito session
      return this.http.post(this.api_gateway_url, data, { headers }).subscribe(
        response => {
          if (!response) {
            console.log('presumably wont get any session');
          }
          console.log('got response check dynamo');
          // Todo redirect to pronosticos
        },
        error => console.error(error)
      );
    });
  }
}
