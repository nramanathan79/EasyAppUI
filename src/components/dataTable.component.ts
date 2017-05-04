import { Component, Input, OnInit } from '@angular/core';
import { DataTableConfigService, DataTableConfig } from '../services/dataTableConfig.service';
import { DataTableService } from '../services/dataTable.service';
import { ColumnFilter } from './columnFilter.component';

@Component({
  selector: 'data-table',
  templateUrl: 'templates/dataTable.html',
  providers: [DataTableConfigService, DataTableService]
})
export class DataTableComponent implements OnInit {
  @Input()
  dataTableServiceName: string;

  dataTableConfig: DataTableConfig;
  numberOfColumns: number = 1;
  searchText: string = "";
  sortSelection: string = "Single";
  sortBy: string[] = [];
  columns: string[] = [];
  columnFilters: ColumnFilter[] = [];
  error: string = "";
  editing: boolean = false;
  recordBeforeEdit: any = {};
  records: any[] = [];
  filteredRecords: any[] = [];
  csvFile: File;

  constructor(private dataTableConfigService: DataTableConfigService, private dataTableService: DataTableService) { }

  private getDataTable(): void {
    this.dataTableConfigService.getDataTableConfig(this.dataTableServiceName).then(dataTableConfig => {
      this.dataTableConfig = dataTableConfig;
      this.numberOfColumns = (this.dataTableConfig.enableRowNum ? 1 : 0) + this.dataTableConfig.columns.length + (this.dataTableConfig.enableDataEdit ? 1 : 0);
      this.dataTableService.getDataTable(this.dataTableConfig.dataEndPoint).then(records => {
        this.records = records;
        this.filteredRecords = records;
      });
    });
  }

  ngOnInit(): void {
    this.getDataTable();
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
    var columnIndex: number = this.sortBy.indexOf(column);
    var columnReverseIndex: number = this.sortBy.indexOf('-' + column);

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

    this.sort();
  }

  showSortIndex(column: string): number {
    if (this.sortSelection === 'Multiple') {
      var columnIndex: number = this.sortBy.indexOf(column);
      if (columnIndex >= 0) {
        return columnIndex + 1;
      }

      var columnReverseIndex: number = this.sortBy.indexOf('-' + column);
      if (columnReverseIndex >= 0) {
        return columnReverseIndex + 1;
      }
    }

    return -1;
  }

  sort(): void {
    if (!this.sortPresent()) {
      return;
    }

    this.filteredRecords.sort((a: any, b: any) => {
      for (var field in this.sortBy) {
        var desc: boolean = field.startsWith("-");
        var column: string = desc ? field.substring(1) : field;

        if (desc) {
          if (a[column] < b[column]) {
            return 1;
          } else if (a[column] > b[column]) {
            return -1;
          }
        } else {
          if (a[column] < b[column]) {
            return -1;
          } else if (a[column] > b[column]) {
            return 1;
          }
        }
      }

      return 0;
    });
  }

  noRecordsFound(): boolean {
    return this.filteredRecords && this.filteredRecords.length == 0 && this.searchText === '' && this.columnFilters.length <= 0;
  }

  cancelRecord(record: any): void {
		if (record.id) {
			this.filteredRecords[this.filteredRecords.indexOf(record)] = JSON.parse(JSON.stringify(this.recordBeforeEdit));
			this.recordBeforeEdit = {};
		}
		else {
			this.filteredRecords.splice(this.records.indexOf(record), 1);
		}

		this.editing = false;
		this.error = "";
	}

  trackId(index: number, record: any): string {
    return record.id;
  }

  hasFilters(): boolean {
    return this.columnFilters && this.columnFilters.length > 0;
  }

  hasImportCsvFile(): boolean {
    return this.csvFile && this.csvFile.name && this.csvFile.name.length > 0;
  }

  importCsvFile(): void {

  }

  performSearch(): void {
    this.filterRecords();
  }

  filterRecords(): void {
    this.filteredRecords = [];

		this.records.forEach(record => {
			var matchFound: boolean = true;

			if (matchFound && this.searchText) {
				var recordString: string = "";

				for (var col = 0; col < this.columns.length; col++) {
					var colName: string = this.columns[col];
					recordString += record[colName];
				}

				if (recordString.search(new RegExp(this.searchText, 'i')) < 0) {
					matchFound = false;
				}
			}

			if (matchFound && this.columnFilters) {
				for (var col: number = 0; matchFound && col < this.columnFilters.length; col++) {
					matchFound = this.columnFilters[col].match(record);
				}
			}

			if (matchFound) {
				this.filteredRecords.push(record);
			}
		});
  }
}
