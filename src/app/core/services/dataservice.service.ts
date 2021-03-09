
import { Injectable, InjectionToken, Injector, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

export interface IDataService {
  baseUrl: string;
  connect(method: string, url: string, callBack: Function): void;
  buildParam(input: any): any;
}
export const DATA_SERVICES = new InjectionToken<IDataService>('IDataService');
@Injectable()
export abstract class BaseDataService implements IDataService {
  protected http: HttpClient;
  protected toastr: ToastrService;
  requestParams: any = null;
  baseUrl: string = '';
  constructor(private injector: Injector) {
    this.http = injector.get(HttpClient);
    this.toastr = injector.get(ToastrService);
  }
  connect(method: string, url: string, callBack: Function): void {
    if (!this.getDummyMode()) {
      switch (method) {
        case 'POST':
          this.http.post(url, this.requestParams)
            .pipe().subscribe(
              (response: any) => {
                //console.log(response);
                if (callBack != null) {
                  callBack(response);
                }
              },
              error => {
                this.popError(error);
              });
          break;
        case 'PUT':
          this.http.put(url, this.requestParams)
            .pipe().subscribe(
              (response: any) => {
                //console.log(response);
                if (callBack != null) {
                  callBack(response);
                }
              },
              error => {
                this.popError(error);
              });
          break;
        case 'GET':
          this.http.get(url, { params: this.requestParams })
            .pipe().subscribe(
              (response: any) => {
                //console.log(response);
                if (callBack != null) {
                  callBack(response);
                }
              },
              error => {
                this.popError(error);
              });
          break;
        case 'DELETE':
          this.http.delete(url)
            .pipe().subscribe(
              (response: any) => {
                //console.log(response);
                if (callBack != null) {
                  callBack(response);
                }
              },
              error => {
                this.popError(error);
              });
          break;
      }
    }
    else {
      callBack(this.generateDummy(url));
    }
  }

  private popError(error: any) {
    //console.log (error.status);
    if (error.status === 400) {
      const listErrorMessages = [];
      for (const message of error.error.messages) {
        listErrorMessages.push(message.content);
      }
      if (listErrorMessages.length > 0) {
        this.toastr.error(listErrorMessages.join('<br/>'), 'Error');
      }
    }
  }

  buildParam(input: any): any {
    this.requestParams = input;
    return;
  }
  abstract generateDummy(url: string): any;
  abstract getDummyMode(): boolean;

}
