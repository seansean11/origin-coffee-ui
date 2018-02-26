import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Trade } from '../org.origincoffee.biznet';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class TradeService {

  private NAMESPACE: string = 'Trade';

  constructor(private dataService: DataService<Trade>) {
  };

  public addTrade(itemToAdd: any): Observable<Trade> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

}
