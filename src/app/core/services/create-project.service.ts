import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShareFunctionService } from '../../core/services/share-function.service';
import { param } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class CreateProjectService {
  // private baseUrl = 'http://192.168.1.111/api/';
  constructor(private http: HttpClient, private shareFunctionService: ShareFunctionService) { }

  uploadImage(param: any) {
    return this.http.post('files/upload', param);
  }

  createProjectList(item: any) {
    let params = {
      user_id: localStorage.credentials ? JSON.parse(localStorage.credentials).id : null,
      name: item.nameProject,
      id_province: item.cityId,
      id_district: item.districtId,
      id_ward: item.wardId,
      street: item.street,
      address: item.address,
      type_of_price: item.priceAgreement ? 1 : 0,
      price: item.price && !item.priceAgreement ? this.shareFunctionService.parseNumberCommas(item.price) : 0,
      price_min: item.priceMin && !item.priceAgreement ? this.shareFunctionService.parseNumberCommas(item.priceMin) : 0,
      price_max: item.priceMax && !item.priceAgreement ? this.shareFunctionService.parseNumberCommas(item.priceMax) : 0,
      acreage: item.acreage || 0,
      acreage_min: 0,
      acreage_max: 0,
      description: item.description,
      project_type: item.typeProjectId,
      longitude: item.long,
      latitude: item.lat,
      list_images: item.libraryImageList,
      investor: item.investor,
      project_scale: item.scale,
      keywords: item.keywords,
      tag: item.tag,
      list_images_design: item.constructionImageList,
      utilities: item.utilityList,
    }
    return this.http.post('projects', params);
  }

  updateProjectList(item: any, projectId: any) {
    let params = {
      user_id: localStorage.credentials ? JSON.parse(localStorage.credentials).id : null,
      name: item.nameProject,
      id_province: item.cityId,
      id_district: item.districtId,
      id_ward: item.wardId,
      street: item.street,
      address: item.address,
      type_of_price: item.priceAgreement ? 1 : 0,
      price: item.price && !item.priceAgreement ? this.shareFunctionService.parseNumberCommas(item.price) : 0,
      price_min: item.priceMin && !item.priceAgreement ? this.shareFunctionService.parseNumberCommas(item.priceMin) : 0,
      price_max: item.priceMax && !item.priceAgreement ? this.shareFunctionService.parseNumberCommas(item.priceMax) : 0,
      acreage: item.acreage || 0,
      acreage_min: 0,
      acreage_max: 0,
      description: item.description,
      project_type: item.typeProjectId,
      longitude: item.long,
      latitude: item.lat,
      list_images: item.libraryImageList,
      investor: item.investor,
      project_scale: item.scale,
      keywords: item.keywords,
      tag: item.tag,
      list_images_design: item.constructionImageList,
      utilities: item.utilityList,
    }
    return this.http.put(`projects/${projectId}`, params);
  }

  approvalProject(item: any) {
    return this.http.put(`admin/projects/${item.id}/approval`, { status: item.status });
  }

  checkNameProject(param: any) {
    return this.http.post(`projects/check-name`, param);
  }
}
