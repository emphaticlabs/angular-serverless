import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { FixtureBet } from '../interfaces/bet.interfaces';
import { UserService } from '../user.service';
import 'rxjs/add/operator/mergeMap';
import { Router } from '@angular/router';

@Injectable()
export class PronosticosService {
  private api_gateway_url: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {
    this.api_gateway_url = environment.api_gateway_url;
  }

  getCognitoAuthenticatedUser() {
    return this.userService.getAuthenticatedUser();
  }

  sendToLogin() {
    this.router
      .navigateByUrl('/login')
      .then(ok => console.log('send user to login form'));
  }

  postPronostico(data: FixtureBet): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.userService.getIdToken()
    });
    return this.http.post(this.api_gateway_url, data, { headers });
  }

  getPronosticosList(): any {
    const headers = new HttpHeaders({
      Authorization: this.userService.getIdToken()
    });
    return this.http.get<FixtureBet[]>(this.api_gateway_url, { headers });
  }
}
