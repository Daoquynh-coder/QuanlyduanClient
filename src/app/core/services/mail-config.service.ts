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
export class MailConfigService {


  constructor(private http: HttpClient) { }

  putMailConfig(params:any){
    // return this.http.put(`config/${params.id}` , {
    return this.http.put(`config/${params.id}` , {
      id: +params.id,
      email_mail: params.email_mail,
      email_password: params.email_password,
      subject: params.subject,
      email_name: params.email_name,
      email_pattern: params.email_pattern,
      invite_reward_coin: params.invite_reward_coin,
      invite_reward_coin_rate_per_charge: params.invite_reward_coin_rate_per_charge,
    });
  }

  getMailConfig(){
    return this.http.get("config");
  }
}
