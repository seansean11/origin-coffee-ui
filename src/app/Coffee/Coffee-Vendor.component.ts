import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TradeService } from '../Trade/Trade.service';
import { CoffeeService } from './Coffee.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-Coffee-Vendor',
  templateUrl: './Coffee-Vendor.component.html',
  styleUrls: ['./Coffee.component.css'],
  providers: [TradeService, CoffeeService]
})
export class CoffeeVendorComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  coffee = new FormControl("", Validators.required);
  newOwner = new FormControl("", Validators.required);

  constructor(private serviceCoffee: CoffeeService, private serviceTrade: TradeService, fb: FormBuilder) {
    this.myForm = fb.group({
      coffee: this.coffee,
      newOwner: this.newOwner
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceCoffee.getAll()
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        result.forEach(asset => {
          tempList.push(asset);
        });
        this.allAssets = tempList;
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else {
          this.errorMessage = error;
        }
      });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTrade(form: any): Promise<any> {
    this.asset = {
      $class: "org.origincoffee.biznet.Trade",
      "coffee": this.coffee.value,
      "newOwner": this.newOwner.value
    };

    return this.serviceTrade.addTrade(this.asset)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else {
          this.errorMessage = error;
        }
      });
  }

  getForm(id: any): void {
    this.errorMessage = null;
    let formObject = {
      "coffee": id.toString(),
      "newOwner": null
    };
    this.myForm.setValue(formObject);
  }

  resetForm(): void {
    this.myForm.setValue({
      "coffee": null,
      "newOwner": null
    });
  }

}
