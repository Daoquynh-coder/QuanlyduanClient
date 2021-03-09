import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { ParamsReactLike, ParamsReactDislike } from "../models/news-detail.model";
@Injectable({
  providedIn: "root",
})
export class NewsDetailService {
  // private baseUrl = 'http://192.168.1.111/api/';

  private _postIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  postIdSubject$: Observable<number> = this._postIdSubject.asObservable();

  private _navigateReloadDataSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  navigateReloadData$: Observable<boolean> = this._navigateReloadDataSubject.asObservable();

  constructor(private http: HttpClient) { }
  getNewsDetails(url: string): any {
    return this.http.get(`posts/${url}/view`);
  }

  reactLikeNewsDetails(params: ParamsReactLike) {
    return this.http.post("react", params);
  }
  reactDislikeNewsDetails(params: ParamsReactDislike) {
    return this.http.put("react", params);
  }

  setPostId(id: number): void {
    this._postIdSubject.next(id);
  }

  setNavigateReloadData(status: boolean) {
    this._navigateReloadDataSubject.next(status);
  }

  getUserInfo(id: number | string) {
    return this.http.get(`user/${id}`);
  }
  getContactedPeople(userId: number | string, postId: number) {
    let params = {
      user_id: userId.toString(),
      post_id: postId.toString(),
    };
    return this.http.get("contact", { params: params });
  }

  getListsSimilar(url: number) {
    return this.http.get(`posts/${url}/similar`);
  }

  getBDS(sortBy: any, sort: any, nameField: any, value: any): Observable<any> {
    // this.buildParam({
    //     limit: 20,
    //     orderBy:"view"
    // });
    // this.connect('GET', 'posts/display', callBack);
    return this.http.get('posts/home?sort_by=' + sortBy + '&sort=' + sort + '&limit=20&' + nameField + '=' + value);
  }
}
