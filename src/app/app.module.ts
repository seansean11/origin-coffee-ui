import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Configuration } from './configuration';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CoopComponent } from './coop/coop.component';
import { VendorComponent } from './vendor/vendor.component'
import { CoffeeFarmerComponent } from './Coffee/Coffee-farmer.component';
import { CoffeeVendorComponent } from './Coffee/Coffee-vendor.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CoopComponent,
    VendorComponent,
    CoffeeFarmerComponent,
    CoffeeVendorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    Configuration,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
