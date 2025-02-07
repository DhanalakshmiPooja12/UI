import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient) {}

  post(url: any, data: any) {
    return this.http.post(environment.url + url, data);
  }
  customPost(url: any, data: any) {
    return this.http.post(url, data);
  }
  delete(url: any) {
    return this.http.delete(environment.url + url);
  }
  put(url: any, data: any) {
     return this.http.put(environment.url + url, data);
  }
  get(url: any) {
    return this.http.get(environment.url + url);
  }
  

}
