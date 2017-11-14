import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import {
  Fixture,
  LigaTable,
  LigaTeam,
  TeamFixtures
} from './interfaces/table.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Fix } from 'tslint';

@Injectable()
export class LigaService {
  ligaTableUrl: string;
  teamByIdUrl: string;
  getFixturesByIdUrl: string;
  getFixtureByIdUrl: string;
  _tableDataSubject$: BehaviorSubject<LigaTable | null> = new BehaviorSubject<
    LigaTable
  >(null);
  TableData$: Observable<LigaTable | null> = this._tableDataSubject$.asObservable();

  _fixturesFilterSubject$: BehaviorSubject<
    Fixture[] | null
  > = new BehaviorSubject<Fixture[]>(null);

  private _loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  // get one fixture CURRENT from id subject and observable
  private _currentFixture$ = new BehaviorSubject<any | null>(null);
  currentFixture$: Observable<any> = this._currentFixture$.asObservable();

  loading$ = this._loadingSubject.asObservable();

  constructor(private http: HttpClient) {
    this.ligaTableUrl = environment.ligaTableUrl;
    this.teamByIdUrl = environment.teamByIdUrl;
    this.getFixturesByIdUrl = environment.getFixturesByIdUrl;
    this.getFixtureByIdUrl = environment.getFixtureByIdUrl;
    // get the Table data for first time
    this.getTable();
    this.getLaLigaFixturesByTI('81');
  }

  getTable(): Observable<LigaTable> {
    return this.http.get<LigaTable>(this.ligaTableUrl).shareReplay();
    // .subscribe(tableData => this._tableDataSubject$.next(tableData));
  }

  getTeamById(id: string): Observable<LigaTeam> {
    return this.http.get<LigaTeam>(this.teamByIdUrl + id).shareReplay();
  }

  getFixtureById(id: string): Observable<any> {
    return this.http.get<any>(this.getFixtureByIdUrl + id).shareReplay();
  }

  getFixturesByTeamId(id: string) {
    return this.http
      .get<TeamFixtures>(
        this.getFixturesByIdUrl + `${id}/fixtures?timeFrame=n30`
      )
      .shareReplay();
  }

  getLaLigaFixturesByTI(id: string) {
    return (
      this.getFixturesByTeamId(id)
        .pluck('fixtures')
        // .switchMap((fix: Fixture[]) => Observable.from(fix));
        .subscribe((fixtures: Fixture[]) => {
          const filteredArr = fixtures.filter(
            fix => fix['_links'].competition.href.split('/').pop() === '455'
          );
          this._fixturesFilterSubject$.next(filteredArr);
        })
    );
  }
}
