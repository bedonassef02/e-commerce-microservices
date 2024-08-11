import { Observable } from 'rxjs';

export interface IPagination {
  handleQuery(query: any): Promise<any[]>;
  countDocuments(query: any): Observable<number>;
  filter(query: any): any;
}
