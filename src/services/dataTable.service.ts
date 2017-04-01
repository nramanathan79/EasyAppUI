import { Injectable } from '@angular/core';

export class ElementConfig {
  private id: string;
  private styleClasses: string[];
  private customStyle: string;
}

export class CellConfig extends ElementConfig {
  private rowspan: number = 1;
  private colspan: number = 1;
}

export class HeaderCellConfig extends CellConfig {
  private label: string;
  private labelPosition: string = "left";
}

export class InputFieldConfig extends ElementConfig {
  private label: string;
	private name: string;
	private required: boolean;
	private inputType: string;
	private stepInterval: string;
	private inputPattern: string;
	private patternMismatchMessage: string;
	private placeholder: string;
	private trim: string;
	private minLength: number;
	private maxLength: number;
	private minValue: number;
	private maxValue: number;
}

export class DataCellConfig extends HeaderCellConfig {
  private showLabel: boolean;
  private inputFieldConfig: InputFieldConfig;
}

export class ColumnConfig extends ElementConfig {
  private headerCellConfig: HeaderCellConfig;
  private dataCellConfig: DataCellConfig;
}

export class DataTableConfig extends ElementConfig {
  private enableSearch: boolean = false;
  private enableColumnSort: boolean = false;
  private enableMultiColumnSort: boolean = false;
  private enableColumnFilter: boolean = false;
  private enableImportCsv: boolean = false;
  private enableExportCsv: boolean = false;
  private enableRefresh: boolean = false;
  private enablePagination: boolean = false;
  private enableRowNum: boolean = false;
  private enableDataEdit: boolean = false;
  private dataEditEndPoint: string;
  private columnsConfig: ColumnConfig[];
}

@Injectable()
export class dataTableService {
  private configDictionary = {};

  public getDataTableConfig(dataTableName: string): Promise<DataTableConfig> {
    if (!this.configDictionary[dataTableName]) {
      this.configDictionary[dataTableName] = {};
    }

    return Promise.resolve(this.configDictionary[dataTableName]);
  }
}
