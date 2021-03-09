import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateNewService {
  constructor(private http: HttpClient) { }

  getPostProjectNew(param: any){
    return this.http.post('projects/create', {
      name: param.name,
      avatar: param.avatar,
      start_date: param.start_date,
      plan_close_date: param.plan_close_date,
      type: param.type,
      size: param.size,
      contract_status: param.contract_status,
      unit_price: param.unit_price,
      description: param.description,

    });
  }
  putProject(param: any){
    return this.http.put('projects/update/' + param.id, {
      name: param.name,
      avatar: param.avatar,
      start_date: param.start_date,
      plan_close_date: param.plan_close_date,
      type: param.type,
      size: param.size,
      contract_status: param.contract_status,
      unit_price: param.unit_price,
      description: param.description,
    });
  }
  DeleteProject(param: any){
    return this.http.delete('projects/delete/' + param, {
    });
  }

}
