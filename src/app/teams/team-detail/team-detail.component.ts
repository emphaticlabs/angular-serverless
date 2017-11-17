import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {
  Fixture,
  LigaTeam,
  TeamFixtures
} from '../../interfaces/table.interface';
import { LigaService } from '../../tabla.service';
import { FixtureDatasource } from './fixture.datasource';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { registerLocaleData } from '@angular/common';
import localeEsGT from '@angular/common/locales/es-GT';

// utility functs
import { getLastSlashValue } from '../../utility-functions/process-href-strings';
// register locale

registerLocaleData(localeEsGT);

@Component({
  selector: 'liga-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {
  private _ligaTeamSubject$: BehaviorSubject<LigaTeam | null> = new BehaviorSubject<LigaTeam | null>(
    null
  );
  ligaTeam$: Observable<LigaTeam | null> = this._ligaTeamSubject$.asObservable();
  teamFixtures$: Observable<TeamFixtures>;
  teamFixtureArr: Observable<Fixture[]>;
  dataSource: FixtureDatasource;
  displayedColumns = ['jornada', 'columna', 'versus', 'pronostico'];

  constructor(
    private route: ActivatedRoute,
    private ligaService: LigaService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .do((params: ParamMap) => console.log('team-id', params.get('id')))
      .switchMap((params: ParamMap) =>
        this.ligaService.getTeamById(params.get('id'))
      )
      .subscribe(
        (data: LigaTeam) => {
          this._ligaTeamSubject$.next(data);
        },
        err => {
          this._ligaTeamSubject$.next(null);
          console.log('error: ', err.message);
        }
      );
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.ligaService.getFixturesByTeamId(params.get('id'))
      )
      .subscribe((data: TeamFixtures) => {
        let filteredFixtures: Fixture[] | any[] = [];
        if (data['fixtures'] && data['fixtures'].length > 0 ) {
           filteredFixtures = data['fixtures'].filter(
            fix => fix['_links'].competition.href.split('/').pop() === '455'
          );
        }
        this.dataSource = new FixtureDatasource(
          Observable.of(filteredFixtures)
        );
      });
  }

  getVsTeam(row: Fixture) {
    const output = { vsTeam: '', asHome: false };
    const teamName = this._ligaTeamSubject$.getValue().name;
    const homeTeamName = row.homeTeamName;
    const awayTeamName = row.awayTeamName;
    output.asHome = teamName === homeTeamName;
    output.vsTeam = output.asHome ? awayTeamName : '@ ' + homeTeamName;
    return output.vsTeam;
  }
  getFixtureId(href: string): string {
    return getLastSlashValue(href);
  }
}
