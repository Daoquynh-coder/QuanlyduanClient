import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  sortTypeList: string[]= ['Mặc định', 'Giá', 'Diện tích'];
  sortOption: string[] = ['Giảm dần','Tăng dần'];
  constructor() { }

}
