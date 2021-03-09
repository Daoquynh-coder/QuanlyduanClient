import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class ProjectManagementService {
  // private baseUrl = 'http://192.168.1.111/api/';

  constructor(private http: HttpClient) { }

  getProjectByUser(param: any) {
    return this.http.get(`projects/management`, {
      params: {
        page: param.page,
        limit: param.limit,
        id_province: param.province,
        id_district: param.district,
        id_ward: param.ward,
        project_type: param.type_of_project,
        // status: param.status,
        match_by: param.match_by,
        match: param.match,
        sort_by: param.sort_by,
        sort: param.sort,
        // from_date: param.from_date,
      }
    });
  }
  getUserInfo() {
    return this.http.get(`projects/statistic`);
  }
  deleteProject(param: any) {
    return this.http.delete(`${'projects/' + param.projectId}`);
  }
  updateProjectStatus() {
    // return this.http.put(``);
  }
}
