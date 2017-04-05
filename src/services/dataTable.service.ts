import { Injectable } from '@angular/core';

const dataTableApiEndPoint: string = "http://localhost:8080/api/v1";

export class ElementConfig {
  id?: string;
  styleClasses?: string;
  customStyle?: string;
}

export class CellConfig extends ElementConfig {
  rowspan?: number;
  colspan?: number;
}

export class HeaderCellConfig extends CellConfig {
  label?: string;
  labelPosition?: string;
}

export class InputFieldConfig extends ElementConfig {
  label: string;
	name: string;
	required?: boolean;
	inputType?: string = "text";
	stepInterval?: string;
	inputPattern?: string;
	patternMismatchMessage?: string;
	placeholder?: string;
	trim?: string;
	minLength?: number;
	maxLength?: number;
	minValue?: number;
	maxValue?: number;
}

export class DataCellConfig extends HeaderCellConfig {
  showLabel?: boolean;
  inputField: InputFieldConfig;
}

export class ColumnConfig extends ElementConfig {
  headerCell?: HeaderCellConfig;
  dataCell: DataCellConfig;
}

export class DataTableConfig extends ElementConfig {
  enableSearch?: boolean = false;
  enableColumnSort?: boolean = false;
  enableMultiColumnSort?: boolean = false;
  enableColumnFilter?: boolean = false;
  enableImportCsv?: boolean = false;
  enableExportCsv?: boolean = false;
  enableRefresh?: boolean = false;
  enablePagination?: boolean = false;
  enableRowNum?: boolean = false;
  enableDataEdit?: boolean = false;
  dataEditEndPoint: string;
  columns: ColumnConfig[];
}

@Injectable()
export class DataTableService {
  private configDictionary: { [serviceName: string]: DataTableConfig } = {};

  public getDataTableConfig(dataTableServiceName: string): Promise<DataTableConfig> {
    if (!this.configDictionary[dataTableServiceName]) {
      if (dataTableServiceName === 'countries') {
        this.configDictionary[dataTableServiceName] = {
          enableSearch: true,
          enableColumnSort: true,
          enableMultiColumnSort: true,
          enableColumnFilter: true,
          enableImportCsv: true,
          enableExportCsv: true,
          enableRefresh: true,
          enableRowNum: true,
          enableDataEdit: true,
          dataEditEndPoint: "/" + dataTableServiceName,
          styleClasses: "table table-striped table-bordered mtop-5 mbottom-5",
          columns: [
            {
              dataCell: {
                inputField: {
                  name: "continent",
                  label: "Continent",
                  placeholder: "Continent",
                  inputPattern: "[A-Za-z ]+",
                  patternMismatchMessage: "Input may only contain words",
                  required: true
                }
              }
            },
            {
              dataCell: {
                inputField: {
                  name: "countryName",
                  label: "Country",
                  placeholder: "Country",
                  inputPattern: "[A-Za-z \\-,]+",
                  patternMismatchMessage: "Input may only contain words",
                  required: true
                }
              }
            },
            {
              dataCell: {
                inputField: {
                  name: "isoAlpha2Code",
                  label: "Alpha-2 Code",
                  placeholder: "Alpha-2 Code",
                  inputPattern: "[A-Za-z]{2}",
                  patternMismatchMessage: "Input may only contain two alphabets",
                  minLength: 2,
                  maxLength: 2,
                  required: true
                },
                customStyle: "width: 60px;"
              }
            },
            {
              dataCell: {
                inputField: {
                  name: "isoAlpha3Code",
                  label: "Alpha-3 Code",
                  placeholder: "Alpha-3 Code",
                  inputPattern: "[A-Za-z]{3}",
                  patternMismatchMessage: "Input may only contain three alphabets",
                  minLength: 3,
                  maxLength: 3,
                  required: true
                },
                customStyle: "width: 75px;"
              }
            },
            {
              dataCell: {
                inputField: {
                  name: "isoNumericCode",
                  label: "Numeric Code",
                  placeholder: "Numeric Code",
                  inputPattern: "[0-9]+",
                  patternMismatchMessage: "Input may only contain numbers upto three digits",
                  maxLength: 3,
                  required: true
                },
                customStyle: "width: 75px;"
              }
            },
            {
              dataCell: {
                inputField: {
                  name: "callingCode",
                  label: "Phone Code",
                  placeholder: "Phone Code",
                  inputType: "integer",
                  minValue: 1,
                  maxValue: 999999
                },
                styleClasses: "pull-right"
              }
            },
            {
              dataCell: {
                inputField: {
                  name: "currencyCode",
                  label: "Currency Code",
                  placeholder: "Currency Code",
                  inputPattern: "[A-Za-z]{3}",
                  patternMismatchMessage: "Input may only contain three alphabets",
                  minLength: 3,
                  maxLength: 3
                },
                customStyle: "width: 75px;"
              }
            }
          ]
        };
      }
    }

    return Promise.resolve(this.configDictionary[dataTableServiceName]);
  }
}
