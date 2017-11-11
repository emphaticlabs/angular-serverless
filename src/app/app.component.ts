import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import {AuthState} from './enums/user.enums';

@Component({
  selector: 'liga-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLogin$: Observable<AuthState>;

  constructor(private _userService: UserService) {
    this.isLogin$ = this._userService.isLogin$;
  }

  logout() {
    this._userService.logout();
  }
}
