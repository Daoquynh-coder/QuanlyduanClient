import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  postRecentlyList: any[]= [{id:1,name:'5 Ngày qua'},{id:2,name:'15 Ngày qua'},{id:3,name:'30 Ngày qua'},{id:4,name:'45 Ngày qua'}];
  sortTypeList: string[]= ['Mặc định', 'Lượt thích','Lượt xem', 'Lượt chia sẻ', 'Lượt bình luận', 'Lượt báo cáo'];
  sortOption: string[] = ['Giảm dần','Tăng dần'];
  constructor(private http: HttpClient) { }
}
