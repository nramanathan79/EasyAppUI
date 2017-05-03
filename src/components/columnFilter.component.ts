import { Component, Input, OnInit } from '@angular/core';
import { InputFieldConfig } from '../services/dataTableConfig.service';

export class UniqueValue {
  value: string;
  selected: boolean = false;
}

export class ColumnFilter {
  name: string;
  type: string;
  filterPresent: boolean = false;
  uniqueValuesFilterPresent: boolean = false;
  uniqueValues: UniqueValue[] = [];

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
  }
}

@Component({
  selector: 'column-filter',
  templateUrl: 'templates/columnFilter.html'
})
export class ColumnFilterComponent implements OnInit {
  @Input()
  columnDataField: InputFieldConfig;

  columnFilter: ColumnFilter;

  ngOnInit(): void {
    this.columnFilter = new ColumnFilter(this.columnDataField.name, this.columnDataField.inputType);
  }

  trackValue(index: number, uniqueValue: UniqueValue): string {
    return uniqueValue.value;
  }
}
