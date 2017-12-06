import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../user.service';
import {Observable} from 'rxjs/Observable';
import {AuthState} from '../enums/user.enums';

@Injectable()
export class PronosticosGuard implements CanActivate {
  constructor(private authService: UserService) {}
  canActivate(): Observable<boolean> {
    return this.authService.isLogin$.map(authState => authState === AuthState.Login);
  }
}
