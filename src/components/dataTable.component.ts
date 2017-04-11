import { Component, Input, OnInit } from '@angular/core';
import { DataTableService, DataTableConfig } from '../services/dataTable.service'

@Component({
  selector: 'data-table',
  templateUrl: 'templates/dataTable.html',
  providers: [DataTableService]
})
export class DataTableComponent implements OnInit {
  @Input()
  dataTableServiceName: string;

  dataTableConfig: DataTableConfig;

  constructor(private dataTableService: DataTableService) { }

  getDataTableConfig(): void {
    this.dataTableService.getDataTableConfig(this.dataTableServiceName).then(dataTableConfig => this.dataTableConfig = dataTableConfig);
  }

  ngOnInit(): void {
    this.getDataTableConfig();
  }
}
