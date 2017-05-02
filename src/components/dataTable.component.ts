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
  searchText: string = "";
  sortSelection: string = "Single";
  sortBy: string[] = [];

  constructor(private dataTableService: DataTableService) { }

  getDataTableConfig(): void {
    this.dataTableService.getDataTableConfig(this.dataTableServiceName).then(dataTableConfig => this.dataTableConfig = dataTableConfig);
  }

  ngOnInit(): void {
    this.getDataTableConfig();
  }

  sortPresent(): boolean {
    return this.sortBy && this.sortBy.length > 0;
  }

  toggleSortSelection(): void {
    this.sortSelection = this.sortSelection === "Single" ? "Multiple" : "Single";
  }

  clearSort(): void {
    this.sortBy = [];
  }

  addSort(column: string): void {
    var columnIndex = this.sortBy.indexOf(column);
    var columnReverseIndex = this.sortBy.indexOf('-' + column);

    if (columnIndex >= 0) {
      this.sortBy[columnIndex] = '-' + column;
    }
    else if (columnReverseIndex >= 0) {
      this.sortBy[columnReverseIndex] = column;
    }
    else {
      if (this.sortSelection === 'Single') {
        this.clearSort();
      }

      this.sortBy.push(column);
    }
  }

  showSortIndex(column: string): number {
    if (this.sortSelection === 'Multiple') {
      var columnIndex = this.sortBy.indexOf(column);
      if (columnIndex >= 0) {
        return columnIndex + 1;
      }

      var columnReverseIndex = this.sortBy.indexOf('-' + column);
      if (columnReverseIndex >= 0) {
        return columnReverseIndex + 1;
      }
    }

    return -1;
  }
}
