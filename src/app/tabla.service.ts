import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { LigaTable } from './interfaces/table.interface';
import { Observable } from 'rxjs/Observable';

// singleton reusable HttpHeaders

/*
const baseAuthHeaders = new HttpHeaders({
  'X-Auth-Token': environment.fbDataKey
});
*/

@Injectable()
export class TableService {
  ligaTableUrl: string;

  constructor(private http: HttpClient) {
    this.ligaTableUrl = environment.ligaTableUrl;
  }

  getTable(): Observable<LigaTable> {
    return this.http.get<LigaTable>(this.ligaTableUrl);
  }
}
