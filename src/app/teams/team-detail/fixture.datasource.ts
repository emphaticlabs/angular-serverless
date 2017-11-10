import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { Fixture } from '../../interfaces/table.interface';
import 'rxjs/add/operator/map';

export class FixtureDatasource extends DataSource<any> {
  constructor(private teamFixtures$: Observable<Fixture[]>) {
    super();
  }
  connect(): Observable<Fixture[]> {
    return this.teamFixtures$;
  }
  disconnect() {}
}
