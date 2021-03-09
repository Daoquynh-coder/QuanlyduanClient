import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetProjectViewService {

  constructor(private http: HttpClient) { }

  getProjectView(params: any){
    return this.http.get('projects/all-projects', params);
  }

  getProjectItem(param: any) {
    return this.http.get('projects/' + param);
  }

  getEstimations(param: any) {
    return this.http.post('projects/estimations/create' , {
      project_id: param.project_id,
      name: param.name,
      date: param.date,
      effort: param.effort,
      unit_price: param.unit_price,
      total: param.total,
    });
  }
  putEstimations(param: any) {
    return this.http.put('projects/estimations/update' , {
      name: param.name,
      date: param.date,
      effort: param.effort,
      unit_price: param.unit_price,
      total: param.total,
      id: param.id

    });
  }
  DeleteEstimations(param: any) {
    return this.http.delete('projects/estimations/delete/' + param, {});
  }

  DeleteStaff(param: any) {
    return this.http.delete('users/delete/' + param, {});
  }

  getProjectEstimationsList(param: any) {
    return this.http.post('projects/estimations/update' , param);
  }

  ProjectDeadlinesCreate(param: any) {
    return this.http.post('projects/deadlines/create' , {
      project_id: param.project_id,
      name: param.name,
      date: param.date,
      status: param.status,
      pic: param.pic,
    });
  }
  ProjectDeadlinesUpdate(param: any) {
    return this.http.put('projects/deadlines/update' , {
      name: param.name,
      date: param.date,
      status: param.status,
      pic: param.pic,
      id: param.id
    });
  }

  DeleteDeadlines(param: any) {
    return this.http.delete('projects/deadlines/delete/' + param, {});
  }

  DeleteResources(param: any) {
    return this.http.delete('projects/resources/delete/' + param, {});
  }

  getProjectDeadlinesTable(param: any) {
    return this.http.get('master/status-deadline' , param);
  }
  getProjectUpdate(param: any) {
    return this.http.put('projects/update/{id}' , param);
  }
  postLogin(param: any) {
    return this.http.post('auth/login' , param);
  }
  postLogout(param: any) {
    return this.http.post('auth/logout' , param);
  }
  getMasterStatusUser() {
    return this.http.get('master/status-user');
  }
  getMasterSkillUser(){
    return this.http.get('master/skills');
  }
  getAllUser() {
    return this.http.get('users/all-users');
  }
  getStatusResources() {
    return this.http.get('master/status-resource');
  }
  getResourcesTableCreate(param: any) {
    return this.http.post('projects/resources/create', {
      project_id: param.project_id,
      user_id: param.user_id,
      start_date: param.start_date,
      end_date: param.end_date,
      busy_rate: param.busy_rate,
      status: param.status
    });
  }
  putResourcesTableUpdate(param: any) {
    return this.http.put('projects/resources/update', {
      user_id: param.user_id,
      start_date: param.start_date,
      end_date: param.end_date,
      busy_rate: param.busy_rate,
      status: param.status,
      id: param.id
    });
  }

  getUser(param: any) {
    return this.http.post('auth/register' , {
      name: param.name,
      username: param.username,
      password: param.password,
      joined_date: param.joined_date,
      status: param.status,
      skills: param.skills,
      join_projects: param.join_projects,
    });
  }
  putStaffTable(param: any) {
    return this.http.put('users/update/'+ param, {
      name: param.name,
      username: param.username,
      password: param.password,
      joined_date: param.joined_date,
      status: param.status,
      skills: param.skills,
      join_projects: param.join_projects,
      id: param.id
    } )
  }
  getDeadlines() {
    return this.http.get('all-deadlines');
  }

}
