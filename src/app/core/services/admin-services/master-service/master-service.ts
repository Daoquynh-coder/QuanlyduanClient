import { Injectable } from '@angular/core';
import { BaseDataService } from '../../dataservice.service';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
}
)
export class MasterService extends BaseDataService{
  generateDummy(url: string) {

  }
  getDummyMode(): boolean {
    return false;
  }

  getPostTypeList(){
    return this.http.get(`admin/post-type`);
  }

  postAPICreatePostType(param:any){
    return this.http.post('admin/post-type/save', param );
  }
  putAPIUpdatePostType(param:any){
    return this.http.put(`admin/post-type/${param.id}/update`, param );
  }

  getMasterInfo(src: any) {
    return this.http.get(`admin/master/${src}`);
  }

  postMasterAdd(src: any, param: any) {
    return this.http.post(`admin/master/${src}`,param);
  }

  putMasterEdit(src: any, param: any) {
    return this.http.put(`admin/master/${src}/${param.id}`,param);
  }

  postMasterDelete(src: any, param: any) {
    return this.http.post(`admin/master/${src}/delete`,param);
  }

}
