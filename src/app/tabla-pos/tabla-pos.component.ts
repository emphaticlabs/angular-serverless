import { Component, OnInit } from '@angular/core';
import { LigaService } from '../tabla.service';
import { TableDataSource } from './tabla-data-source';

@Component({
  selector: 'liga-tabla-pos',
  templateUrl: './tabla-pos.component.html',
  styleUrls: ['./tabla-pos.component.scss']
})
export class TablaPosComponent implements OnInit {
  displayedColumns = ['position', 'club', 'playedGames', 'wins', 'draws', 'losses', 'points'];

  dataSource: TableDataSource | null;

  constructor(private ligaService: LigaService) {}

  ngOnInit() {
    this.dataSource = new TableDataSource(this.ligaService);
  }

  getTeamId(teamHref: string) {
    const teamId = +teamHref.split('/').pop();
    if (Number.isInteger(teamId)) {
      return `/equipo/${teamId}`;
    } else {
      return '/';
    }
  }
}
