import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { TableTeam } from '../interfaces/table.interface';
import { LigaService } from '../tabla.service';
import 'rxjs/add/operator/pluck';

export class TableDataSource extends DataSource<any> {
  constructor(private tableService: LigaService) {
    super();
  }
  connect(): Observable<TableTeam[]> {
    return this.tableService._tableDataSubject$.pluck('standing');
  }
  disconnect() {}
}
