import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { RoutingModule } from './routing.module';

import { MainComponent }      from '../components/main.component';
import { CountriesComponent } from '../components/countries.component';
import { DataTableComponent } from '../components/dataTable.component';

import { DataTableService } from '../services/dataTable.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule
  ],
  declarations: [
    MainComponent,
    CountriesComponent,
    DataTableComponent
  ],
  providers: [
    DataTableService
  ],
  bootstrap: [MainComponent]
})
export class MainModule { }
