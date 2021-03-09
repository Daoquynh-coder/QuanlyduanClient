import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseDataService } from '../../dataservice.service';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class SearchFooterService extends BaseDataService {
  generateDummy(url: string) {
  }
  getDummyMode(): boolean {
    return false;
  }
  dataSearchFooter: any;
  public _status: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  statusSend$: Observable<any> = this._status.asObservable();
  // constructor(private http: HttpClient){}

  getAPISearchFooter() {
    return this.http.get('admin/search-footer');
  }

  postAPICreateFooter(param:any){
    return this.http.post('admin/search-footer/save', param );
  }
  putAPIUpdateFooter(param:any){
    return this.http.put(`admin/search-footer/${param.id}/update`, param );
  }
  postAPIDeleteFooter(id:any){
    return this.http.delete(`admin/search-footer/${id}/delete`, {});
  }

  updateDataSearchFooter(newDataSearchFooter: any) {
    this.dataSearchFooter = newDataSearchFooter;
    this._status.next(true);
  }
  getDataSearchFooter() {
    return this.dataSearchFooter;
  }

}
