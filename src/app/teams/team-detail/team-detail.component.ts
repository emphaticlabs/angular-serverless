import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Fixture, LigaTeam, TeamFixtures } from '../../interfaces/table.interface';
import { LigaService } from '../../tabla.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { FixtureDatasource } from './fixture.datasource';

@Component({
  selector: 'liga-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {
  ligaTeam$: Observable<LigaTeam>;
  teamFixtures$: Observable<TeamFixtures>;
  teamFixtureArr: Observable<Fixture[]>;
  dataSource: FixtureDatasource | null;
  displayedColumns = ['jornada', 'columna'];

  constructor(private route: ActivatedRoute, private ligaService: LigaService) {}

  ngOnInit(): void {
    this.ligaTeam$ = this.route.paramMap.switchMap((params: ParamMap) =>
      this.ligaService.getTeamById(params.get('id'))
    );
    // this.teamFixtures$ = this.route.paramMap.switchMap((params: ParamMap) =>
    //   this.ligaService.getFixturesByTeamId(params.get('id'))
    // );
    this.route.paramMap.switchMap((params: ParamMap) =>
      this.ligaService.getFixturesByTeamId(params.get('id'))
    ).subscribe(() => {
      this.dataSource = new FixtureDatasource(this.ligaService._fixturesFilterSubject$) || null;
    });
    // this.dataSource = new FixtureDatasource(this.teamFixtures$) || null;
    // this.dataSource = new FixtureDatasource(this.teamFixtures$) || null;
  }
}
