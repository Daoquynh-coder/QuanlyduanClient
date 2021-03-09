import { Injectable, InjectionToken, Injector } from '@angular/core';
import { BaseDataService } from './dataservice.service';
import { DummyDataService } from './dummydata.services';

@Injectable({
  providedIn: 'root'
})
export class ShareFunctionService extends BaseDataService {

  constructor(
    private dummyService: DummyDataService,
    private injector2: Injector) {
    super(injector2);
  }

  getDummyMode(): boolean {

    return true;
  }

  generateDummy(url: any): any {
    var dummyData = this.dummyService.createPorfolioList(1);
    return dummyData;
  }

  checkNumberPhone(value: any): boolean {
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (vnf_regex.test(value) == false) {
      return false
    } else {
      return true
    }
  }

  convertToNumberCommas(val: any): any {
    if (val === null || val === undefined || val === '') return '';
    const num = Number(val.toString().replace(/,/g, ''));
    if (Number.isNaN(num)) return val;
    return num.toLocaleString('ja-JP');
  }

  parseNumberCommas(val: any): any {
    if (val === null || val === undefined || val === '') return '';
    return parseFloat(val.replace(/,/g, ''));
  }

  dataURLtoFile(dataurl: any, fileName: any) {
    // dataurl = this.downscaleImage(dataurl, '400px', null, null)
    if (!dataurl) return
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  }

  convertViToEn(str: any) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư

    return str.toUpperCase();
  }

  // Take an image URL, downscale it to the given width, and return a new image URL.
  downscaleImage(dataUrl: any, newWidth: any, imageType: any, imageArguments: any) {
    "use strict";
    var image, oldWidth, oldHeight, newHeight, canvas, ctx, newDataUrl;

    // Provide default values
    imageType = imageType || "image/jpeg";
    imageArguments = imageArguments || 0.7;

    // Create a temporary image so that we can compute the height of the downscaled image.
    image = new Image();
    image.src = dataUrl;
    oldWidth = image.width;
    oldHeight = image.height;
    newHeight = Math.floor(oldHeight / oldWidth * newWidth)

    // Create a temporary canvas to draw the downscaled image on.
    canvas = document.createElement("canvas");
    canvas.width = newWidth;
    canvas.height = newHeight;

    // Draw the downscaled image on the canvas and return the new data URL.
    ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, newWidth, newHeight);
    newDataUrl = canvas.toDataURL(imageType, imageArguments);
    return newDataUrl;
  }

  replaceText(text: any) {
    return text.trim().replaceAll(/\s+/g, ' ').replaceAll(" ", "-")
  }

  removeVietnameseTones(str: any) {
    str = str ? str.toLowerCase() : "";
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    return str;
  }
}
