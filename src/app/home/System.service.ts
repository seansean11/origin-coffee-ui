import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { HistorianRecord } from '../org.hyperledger.composer.system';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class SystemService {


  private NAMESPACE: string = 'System';

  constructor(private dataService: DataService<HistorianRecord>) {
  };

  public getAll(): Observable<HistorianRecord[]> {
    return this.dataService.getAll(`${this.NAMESPACE}/historian`);
  }

}
