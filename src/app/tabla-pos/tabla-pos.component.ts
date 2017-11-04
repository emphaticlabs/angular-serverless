import { Component, OnInit } from '@angular/core';
import {LigaTable} from '../interfaces/table.interface';
import {TableService} from '../tabla.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'liga-tabla-pos',
  templateUrl: './tabla-pos.component.html',
  styleUrls: ['./tabla-pos.component.scss']
})
export class TablaPosComponent implements OnInit {
  laLigaTableData: Observable<LigaTable>;

  constructor(private tableService: TableService) { }

  ngOnInit() {
    this.laLigaTableData = this.tableService.getTable();
  }

}
