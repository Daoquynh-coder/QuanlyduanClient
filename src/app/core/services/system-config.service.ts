import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
}
)
export class SystemConfigService {


  constructor(private http: HttpClient) { }

  postSystemConfig(params:any){
    return this.http.post('system-config' , {
      // id: params.id,
      contentTemp: params.contentTemp,
      timeMail: params.timeMail,
      timeWarning: params.timeWarning,
      numberImage: params.numberImage,
      post_default_footer: params.post_default_footer
    });
  }
  getSystemConfig(){
    return this.http.get("system-config");
  }
}
