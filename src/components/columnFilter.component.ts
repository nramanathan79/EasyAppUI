import { Component, Input, OnInit } from '@angular/core';
import { InputFieldConfig } from '../services/dataTableConfig.service';

export class UniqueValue {
  value: string;
  selected: boolean = false;
}

export class ColumnFilter {
  name: string;
  type: string;
  blank: boolean = false;
  notBlank: boolean = false;
  ignoreCase: boolean = false;
  contains: string = "";
  doesNotContain: string = "";
  startsWith: string = "";
  endsWith: string = "";
  fromNumber: number;
  toNumber: number;
  filterPresent: boolean = false;
  uniqueValuesFilterPresent: boolean = false;
  uniqueValues: UniqueValue[] = [];

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
  }

  match(record: any): boolean {
    if (!record) {
      return false;
    }

    if (this.filterPresent) {
      if (this.blank && record[this.name]) {
        return false;
      }

      if (this.notBlank && !record[this.name]) {
        return false;
      }

      if (this.uniqueValuesFilterPresent) {
        var selectedMatchFound: boolean = false;

        for (var i = 0; i < this.uniqueValues.length; i++) {
          if (this.uniqueValues[i].selected
            && record[this.name] === this.uniqueValues[i].value) {
            selectedMatchFound = true;
          }
        }

        if (!selectedMatchFound) {
          return false;
        }
      }

      if (this.type === 'Text') {
        var ignoreCaseStr = (this.ignoreCase) ? 'i' : '';
        var regExp;

        if (this.contains) {
          regExp = new RegExp(this.contains, ignoreCaseStr);
          if (record[this.name].search(regExp) < 0) {
            return false;
          }
        }

        if (this.doesNotContain) {
          regExp = new RegExp('^((?!' + this.doesNotContain + ').)*$', ignoreCaseStr);
          if (record[this.name].search(regExp) < 0) {
            return false;
          }
        }

        if (this.startsWith) {
          regExp = new RegExp('^' + this.startsWith, ignoreCaseStr);
          if (record[this.name].search(regExp) < 0) {
            return false;
          }
        }

        if (this.endsWith) {
          regExp = new RegExp(this.endsWith + '$', ignoreCaseStr);
          if (record[this.name].search(regExp) < 0) {
            return false;
          }
        }
      }
      else if ((this.type === 'Integer' || this.type === 'Decimal')) {
        if (this.fromNumber && record[this.name] < this.fromNumber) {
          return false;
        }

        if (this.toNumber && record[this.name] > this.toNumber) {
          return false;
        }
      }
    }

    return true;
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
  copyColumnFilter: ColumnFilter;

  ngOnInit(): void {
    this.columnFilter = new ColumnFilter(this.columnDataField.name, this.columnDataField.inputType);
  }

  trackValue(index: number, uniqueValue: UniqueValue): string {
    return uniqueValue.value;
  }

  getFilterClass(): string {
    return this.columnFilter.filterPresent ? 'red' : '';
  }

  backupColumnFilter(): void {
    this.copyColumnFilter = JSON.parse(JSON.stringify(this.columnFilter));
  }

  restoreColumnFilter(): void {
    this.columnFilter = JSON.parse(JSON.stringify(this.copyColumnFilter));
  }

  applyColumnFilter(): void {
    this.columnFilter.filterPresent = this.hasFilter();
    //this.$emit('filterColumn', this.columnFilter);
    this.closeDropdown();
  }

  hasFilter(): boolean {
    if (this.columnFilter.blank || this.columnFilter.notBlank) {
      return true;
    }

    if (this.columnFilter.type === 'Text') {
      if (this.columnFilter.contains
        || this.columnFilter.doesNotContain
        || this.columnFilter.startsWith
        || this.columnFilter.endsWith) {
        return true;
      }
    }
    else if (this.columnFilter.type === 'Integer' || this.columnFilter.type === 'Decimal') {
      if (this.columnFilter.fromNumber
        || this.columnFilter.toNumber) {
        return true;
      }
    }

    if (this.columnFilter.uniqueValues) {
      for (var i = 0; i < this.columnFilter.uniqueValues.length; i++) {
        if (this.columnFilter.uniqueValues[i].selected) {
          this.columnFilter.uniqueValuesFilterPresent = true;
          return true;
        }
      }
    }

    return false;
  }

  closeDropdown(): void {
    delete this.copyColumnFilter;
    //$('.dropdown.open').removeClass('open');
  }
}
