import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent }      from '../components/main.component';
import { CountriesComponent } from '../components/countries.component';

const routes: Routes = [
  { path: 'countries', component: CountriesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule {}
