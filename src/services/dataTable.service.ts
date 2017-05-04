import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import 'rxjs/add/operator/toPromise';

const DATATABLE_API_ENDPOINT: string = "http://localhost:8181/api/v1";

@Injectable()
export class DataTableService {
  constructor(private http: Http) { }

  public getDataTable(dataEndPoint: string): Promise<any[]> {
    return this.http.get(DATATABLE_API_ENDPOINT + dataEndPoint).toPromise().then(response => response.json() as any[]).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
