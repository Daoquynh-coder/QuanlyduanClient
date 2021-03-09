import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShareFunctionService } from '../../core/services/share-function.service';
import { param } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class CreatePostService {
  // private baseUrl = 'http://192.168.1.111/api/';
  constructor(private http: HttpClient, private shareFunctionService: ShareFunctionService) { }

  uploadImage(param: any) {
    return this.http.post('files/upload', param);
  }

  createPostList(item: any) {
    let params = {
      user_id: localStorage.credentials ? JSON.parse(localStorage.credentials).id : null,
      name: item.nameProject,
      type_of_operation: item.type,
      type_of_real_estate: item.typeBDSId,
      province: item.cityId,
      district: item.districtId,
      ward: item.wardId,
      street: item.street,
      address: item.address,
      phone: item.numberPhone,
      type_of_money_price: item.priceAgreement,
      price: item.price && !item.priceAgreement ? this.shareFunctionService.parseNumberCommas(item.price) : 0,
      price_min: item.priceMin && !item.priceAgreement ? this.shareFunctionService.parseNumberCommas(item.priceMin) : 0,
      price_max: item.priceMax && !item.priceAgreement ? this.shareFunctionService.parseNumberCommas(item.priceMax) : 0,
      acreage: item.acreage ? item.acreage : 0,
      acreage_min: item.acreageMin ? item.acreageMin : 0,
      acreage_max: item.acreageMax ? item.acreageMax : 0,
      id_project: +item.projectId,
      seo_description: item.summary,
      keywords: item.keywords,
      tag: item.tag,
      direction: item.directionId,
      unit: item.unit,
      legal_status: item.legalStatusId,
      number_of_bedrooms: item.bedroomNumber ? item.bedroomNumber : 0,
      number_of_bathrooms: item.bathroomNumber ? item.bathroomNumber : 0,
      title: item.title,
      description: item.description,
      type_of_post: item.typeNewsId,
      post_period: item.timeId,
      start_date: item.startDate,
      end_date: item.endDate,
      longitude: item.long,
      latitude: item.lat,
      list_images: item.imageList,
      fee: item.fee,
      width: +item.width,
      height: +item.height,
      front_side: +item.frontSide,
      road: +item.road,
      floors_number: +item.floorsNumber,
      furniture: item.furniture
    }
    return this.http.post('posts', params);
  }

  updatePostList(item: any, postId: any, unpaid: any) {
    let params = {
      // id: postId,
      user_id: localStorage.credentials ? JSON.parse(localStorage.credentials).id : null,
      name: item.nameProject,
      type_of_operation: item.type,
      type_of_real_estate: item.typeBDSId,
      province: item.cityId,
      district: item.districtId,
      ward: item.wardId,
      street: item.street,
      address: item.address,
      phone: item.numberPhone,
      type_of_money_price: item.priceAgreement,
      price: item.price && !item.priceAgreement ? this.shareFunctionService.parseNumberCommas(item.price) : 0,
      price_min: item.priceMin && !item.priceAgreement ? this.shareFunctionService.parseNumberCommas(item.priceMin) : 0,
      price_max: item.priceMax && !item.priceAgreement ? this.shareFunctionService.parseNumberCommas(item.priceMax) : 0,
      acreage: item.acreage ? item.acreage : 0,
      acreage_min: item.acreageMin ? item.acreageMin : 0,
      acreage_max: item.acreageMax ? item.acreageMax : 0,
      direction: item.directionId,
      keywords: item.keywords,
      unpaid: unpaid,
      tag: item.tag,
      legal_status: item.legalStatusId,
      number_of_bedrooms: item.bedroomNumber ? item.bedroomNumber : 0,
      number_of_bathrooms: item.bathroomNumber ? item.bathroomNumber : 0,
      title: item.title,
      unit: item.unit,
      id_project: +item.projectId,
      seo_description: item.summary,
      description: item.description,
      type_of_post: item.typeNewsId,
      post_period: item.timeId,
      start_date: item.startDate,
      end_date: item.endDate,
      longitude: item.long,
      latitude: item.lat,
      list_images: item.imageList,
      fee: item.fee,
      width: +item.width,
      height: +item.height,
      front_side: +item.frontSide,
      road: +item.road,
      floors_number: +item.floorsNumber,
      furniture: item.furniture
      // avatar_images: item.imageList[0],
      // number_of_images: 1,
      // number_of_videos: 1
    }
    return this.http.put(`posts/${postId}`, params);
  }

  createMultiPostList(postList: any) {

    return this.http.post('posts/list', postList.map((item: any) => {
      return {
        user_id: localStorage.credentials ? JSON.parse(localStorage.credentials).id : null,
        name: item.nameProject,
        type_of_operation: item.type,
        type_of_real_estate: item.typeBDSId,
        province: item.cityId,
        district: item.districtId,
        ward: item.wardId,
        street: item.street,
        address: item.address,
        phone: item.numberPhone,
        type_of_money_price: item.priceAgreement,
        price: item.price ? item.price : 0,
        price_min: item.priceMin ? item.priceMin : 0,
        price_max: item.priceMax ? item.priceMax : 0,
        acreage: item.acreage ? item.acreage : 0,
        acreage_min: item.acreageMin ? item.acreageMin : 0,
        acreage_max: item.acreageMax ? item.acreageMax : 0,
        direction: item.directionId,
        legal_status: item.legalStatusId,
        number_of_bedrooms: item.bedroomNumber,
        number_of_bathrooms: item.bathroomNumber,
        title: item.title,
        description: item.description,
        type_of_post: item.typeNewsId,
        post_period: item.timeId,
        start_date: item.startDate,
        end_date: item.endDate,
        longitude: item.long,
        latitude: item.lat,
        design_images: item.imageList,
        avatar_images: item.image,
        number_of_images: 1,
        number_of_videos: 1,
        width: +item.width,
        height: +item.height,
        front_side: +item.frontSide,
        road: +item.road,
        floors_number: +item.floorsNumber,
        furniture: item.furniture
      }
    }));
  }

  vnPay(data: any) {
    let params = {
      id: data.id,
      amount: data.vnp_Amount
    }
    return this.http.get('vn-pay', { params });
  }

  // redirectUrl(data: any) {
  //   return this.http.get('posts/url/' + data);
  // }

  redirectUrl(data: any) {
    return this.http.get('posts/url/' + data)
  }
}
