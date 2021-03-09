import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AppConfig } from "./app.config";
import { environment } from '@env/environment';

@Injectable()
export class AppConfigService {
  private appConfig: AppConfig;

  constructor(private http: HttpClient) {
  }

  public loadAppConfig() {
    var baseUrl = document.getElementsByTagName('base')[0].href;
    baseUrl = !baseUrl.endsWith('/') ? baseUrl + '/' : baseUrl;
    const url = (baseUrl + 'assets/app-config.json');

    return this.http.get(url)
      .toPromise()
      .then((data: any) => {
        this.appConfig = data[environment.name];
      })
      .catch(error => {
        console.log("AppConfigService::loadAppConfig() - " + error);
      });
  }

  public getAppConfig() {
    return this.appConfig;
  }
}
