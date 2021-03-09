import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  sortTypeList: string[]= ['Mặc định', 'Lượt thích', 'Giá', 'Diện tích', 'Số phòng ngủ', 'Số phòng tắm'];
  sortOption: string[] = ['Giảm dần','Tăng dần'];
  constructor() { }

}
