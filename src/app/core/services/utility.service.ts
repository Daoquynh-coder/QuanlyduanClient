import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {
  handleSubmitError400(error: any) {
    const data = {};
    if (error.status === 400) {
      for (const message of error.error.messages) {
        if (!data.hasOwnProperty(message.field)) {
          data[message.field] = [];
        }
        data[message.field].push({error: message.content});
      }
    }
    return data;
  }
}
