import { Component, Input, OnInit } from '@angular/core';
import { DataTableService, DataTableConfig } from '../services/dataTable.service'

@Component({
  selector: 'data-table',
  templateUrl: 'templates/dataTable.html'
})
export class DataTableComponent implements OnInit {
  @Input()
  dataTableServiceName: string;

  dataTableConfig: DataTableConfig;
  dataTableConfigString: string;

  constructor(private dataTableService: DataTableService) { }

  getDataTableConfig(): void {
    this.dataTableService.getDataTableConfig(this.dataTableServiceName).then(dataTableConfig => this.dataTableConfig = dataTableConfig).then(dataTableConfig => this.dataTableConfigString = JSON.stringify(dataTableConfig));
  }

  ngOnInit(): void {
    this.getDataTableConfig();
  }
}
