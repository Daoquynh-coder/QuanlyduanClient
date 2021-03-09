import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class ProjectDetailsService {
  // private baseUrl = 'http://192.168.1.111/api/';

  constructor(private http: HttpClient) { }

  private _navigateReloadDataSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  navigateReloadData$: Observable<boolean> = this._navigateReloadDataSubject.asObservable();

  getProjectDetails(url: string) {
    return this.http.get(`projects/${url}`);
  }

  getUtilitiesProjectDetails(id: number) {
    return this.http.get(`projects/${id}/utilities`);
  }

  getListsImg(dataType: number, dataId: number) {
    let param = {
      data_type: dataType.toString(),
      data_id: dataId.toString(),
    };
    return this.http.get(`files/list`, { params: param });
  }

  getListsSimilar(url: string) {
    return this.http.get(`projects/${url}/similar`);
  }
  setNavigateReloadData(status: boolean) {
    this._navigateReloadDataSubject.next(status);
  }
}
