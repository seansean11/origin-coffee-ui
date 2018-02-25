import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CoffeeService } from './Coffee.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Coffee',
	templateUrl: './Coffee.component.html',
	styleUrls: ['./Coffee.component.css'],
  providers: [CoffeeService]
})
export class CoffeeComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          coffeeId = new FormControl("", Validators.required);
        
  
      
          pounds = new FormControl("", Validators.required);
        
  
      
          organic = new FormControl("", Validators.required);
        
  
      
          harvestedAt = new FormControl("", Validators.required);
        
  
      
          variety = new FormControl("", Validators.required);
        
  
      
          owner = new FormControl("", Validators.required);
        
  


  constructor(private serviceCoffee:CoffeeService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          coffeeId:this.coffeeId,
        
    
        
          pounds:this.pounds,
        
    
        
          organic:this.organic,
        
    
        
          harvestedAt:this.harvestedAt,
        
    
        
          variety:this.variety,
        
    
        
          owner:this.owner
        
    
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
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
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

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.origincoffee.biznet.Coffee",
      
        
          "coffeeId":this.coffeeId.value,
        
      
        
          "pounds":this.pounds.value,
        
      
        
          "organic":this.organic.value,
        
      
        
          "harvestedAt":this.harvestedAt.value,
        
      
        
          "variety":this.variety.value,
        
      
        
          "owner":this.owner.value
        
      
    };

    this.myForm.setValue({
      
        
          "coffeeId":null,
        
      
        
          "pounds":null,
        
      
        
          "organic":null,
        
      
        
          "harvestedAt":null,
        
      
        
          "variety":null,
        
      
        
          "owner":null
        
      
    });

    return this.serviceCoffee.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "coffeeId":null,
        
      
        
          "pounds":null,
        
      
        
          "organic":null,
        
      
        
          "harvestedAt":null,
        
      
        
          "variety":null,
        
      
        
          "owner":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.origincoffee.biznet.Coffee",
      
        
          
        
    
        
          
            "pounds":this.pounds.value,
          
        
    
        
          
            "organic":this.organic.value,
          
        
    
        
          
            "harvestedAt":this.harvestedAt.value,
          
        
    
        
          
            "variety":this.variety.value,
          
        
    
        
          
            "owner":this.owner.value
          
        
    
    };

    return this.serviceCoffee.updateAsset(form.get("coffeeId").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceCoffee.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceCoffee.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "coffeeId":null,
          
        
          
            "pounds":null,
          
        
          
            "organic":null,
          
        
          
            "harvestedAt":null,
          
        
          
            "variety":null,
          
        
          
            "owner":null 
          
        
      };



      
        if(result.coffeeId){
          
            formObject.coffeeId = result.coffeeId;
          
        }else{
          formObject.coffeeId = null;
        }
      
        if(result.pounds){
          
            formObject.pounds = result.pounds;
          
        }else{
          formObject.pounds = null;
        }
      
        if(result.organic){
          
            formObject.organic = result.organic;
          
        }else{
          formObject.organic = null;
        }
      
        if(result.harvestedAt){
          
            formObject.harvestedAt = result.harvestedAt;
          
        }else{
          formObject.harvestedAt = null;
        }
      
        if(result.variety){
          
            formObject.variety = result.variety;
          
        }else{
          formObject.variety = null;
        }
      
        if(result.owner){
          
            formObject.owner = result.owner;
          
        }else{
          formObject.owner = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "coffeeId":null,
        
      
        
          "pounds":null,
        
      
        
          "organic":null,
        
      
        
          "harvestedAt":null,
        
      
        
          "variety":null,
        
      
        
          "owner":null 
        
      
      });
  }

}
