import { Injectable, InjectionToken, Injector } from '@angular/core';
import { BaseDataService } from './dataservice.service';
import { DummyDataService } from './dummydata.services';

@Injectable()
export class MasterService extends BaseDataService {

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

  getList(type: any, callBack: any) {
    this.buildParam({ type: type });
    this.connect('GET', 'get-list-master', callBack);
  }

  getFullListError(param: any) {
    return this.http.post("getFullListMaster", param);
  }
}
