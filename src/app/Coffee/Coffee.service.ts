import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Coffee } from '../org.origincoffee.biznet';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class CoffeeService {

	
		private NAMESPACE: string = 'Coffee';
	



    constructor(private dataService: DataService<Coffee>) {
    };

    public getAll(): Observable<Coffee[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Coffee> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Coffee> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Coffee> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Coffee> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
