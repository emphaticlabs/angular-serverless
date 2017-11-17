import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LigaService } from '../../tabla.service';
import { v4 as uuid } from 'uuid';
import { Fixture } from '../../interfaces/table.interface';
import { getLastSlashValue } from '../../utility-functions/process-href-strings';

// locals
import { registerLocaleData } from '@angular/common';
import localeEsGT from '@angular/common/locales/es-GT';

// rxjs operators
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/shareReplay';
import { FixtureBet } from '../../interfaces/bet.interfaces';
import { Operation, Team } from '../../enums/click-counter.enums';

// declaring locale
registerLocaleData(localeEsGT);
@Component({
  selector: 'liga-pronostico',
  templateUrl: './pronostico.component.html',
  styleUrls: ['./pronostico.component.scss']
})
export class PronosticoComponent implements OnInit {
  fixture$: Observable<any>;
  fixtureData: any | null = null;
  homeTeamScore = 0;
  awayTeamScore = 0;
  constructor(
    private route: ActivatedRoute,
    private ligaService: LigaService
  ) {}

  ngOnInit() {
    this.fixture$ = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.ligaService.getFixtureById(params.get('id'))
      )
      .shareReplay();

    this.fixture$.subscribe(data => {
      this.fixtureData = data.fixture;
    }, err => (this.fixtureData = null));
  }

  buildSubmitDataObj(): FixtureBet | null {
    if (this.fixtureData.date) {
      const fixtureObj = {};
      const teams = {
        home: {
          name: this.fixtureData.homeTeamName,
          id: +this.getLastValue(this.fixtureData._links.homeTeam.href),
          score: this.homeTeamScore
        },
        away: {
          name: this.fixtureData.awayTeamName,
          id: +this.getLastValue(this.fixtureData._links.awayTeam.href),
          score: this.awayTeamScore
        }
      };
      const returnObj = Object.assign(
        fixtureObj,
        { pronosticoId: uuid() },
        {
          fixtureId: +getLastSlashValue(this.fixtureData._links.self.href)
        },
        { teams },
        {
          fixtureDate: this.fixtureData.date,
          timeStamp: new Date().toISOString()
        }
      );
      // console.log('dataPost', JSON.stringify(fixtureObj, null, 2));
      return returnObj;
    } else {
      return null;
    }
  }

  getLastValue(href: string): string {
    return getLastSlashValue(href);
  }

  clickCounter(team: string, operacion: string) {
    let hts = this.homeTeamScore;
    let ats = this.awayTeamScore;

    hts =
      team === 'HOME'
        ? operacion === 'SUMA' ? hts + 1 : hts > 0 ? hts - 1 : 0
        : hts;
    ats =
      team === 'AWAY'
        ? operacion === 'SUMA' ? ats + 1 : ats > 0 ? ats - 1 : 0
        : ats;

    this.homeTeamScore = hts;
    this.awayTeamScore = ats;
  }
  submitBet() {
    console.log('submit-data', this.buildSubmitDataObj());
  }
}
