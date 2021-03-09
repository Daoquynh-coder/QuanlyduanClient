import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DownloadFileService {
  // private baseUrl = 'http://192.168.1.111/api/';
  constructor(private http: HttpClient) { }

  downloadFile() {
    const params = {

    };
    return this.http.get('files/download', { params: params });
  }
}
