import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LigaService } from '../../tabla.service';
import { Fixture } from '../../interfaces/table.interface';
import {registerLocaleData} from '@angular/common';
import localeEsGT from '@angular/common/locales/es-GT';

// rxjs operators
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
// declaring locale
registerLocaleData(localeEsGT);
@Component({
  selector: 'liga-pronostico',
  templateUrl: './pronostico.component.html',
  styleUrls: ['./pronostico.component.scss']
})
export class PronosticoComponent implements OnInit {
  fixture$: Observable<any>;
  fixtureData: Fixture | null;
  homeTeamScore = 0;
  awayTeamScore = 0;
  constructor(
    private route: ActivatedRoute,
    private ligaService: LigaService
  ) {}

  ngOnInit() {
    this.fixture$ = this.route.paramMap.switchMap((params: ParamMap) =>
      this.ligaService.getFixtureById(params.get('id'))
    );
    this.fixture$.subscribe(data => {
      this.fixtureData = data.fixture;
    }, err => (this.fixtureData = null));
  }
}
