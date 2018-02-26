import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VendorComponent } from './vendor/vendor.component';
import { CoopComponent } from './coop/coop.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'coop', component: CoopComponent },
  { path: 'vendor', component: VendorComponent },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
