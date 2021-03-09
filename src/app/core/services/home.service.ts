import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, InjectionToken, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseDataService } from './dataservice.service';
import { DummyDataService } from './dummydata.services';

@Injectable({
  providedIn: 'root',
})
export class HomeService extends BaseDataService {

  constructor(
    private dummyService: DummyDataService,
    private injector2: Injector) {
    super(injector2);
  }

  getDummyMode(): boolean {
    return false;
  }

  generateDummy(url: any): any {
    var dummyData = this.dummyService.createPorfolioList();
    return dummyData;
  }

  // getListCheckPoint(callBack : any) {
  //     this.buildParam({});
  //     this.connect('GET', 'getAllCheckPoint', callBack);
  // }

  // getListShip(callBack : any) {
  //     this.buildParam({});
  //     this.connect('GET', 'getListShipAll', callBack);
  // }
  getOperation(callBack: any) {
    this.buildParam({});
    this.connect('GET', 'master/master_operations', callBack);
  }
  getEstates(callBack: any) {
    this.buildParam({});
    this.connect('GET', 'master/master_estates', callBack);
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  getTopBDS(sortBy: any, sort: any): Observable<any> {
    // this.buildParam({
    //     limit: 20,
    //     orderBy:"view"
    // });
    // this.connect('GET', 'posts/display', callBack);
    return this.http.get('posts/home?sort_by=' + sortBy + '&sort=' + sort + '&limit=20').pipe(catchError(this.handleError))
  }


}
