import { Injectable } from "@angular/core";

@Injectable()
export class WindowService {
  get windowRef() : any {
    return window;
  }
}


