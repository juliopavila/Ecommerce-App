import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UrlProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UrlProvider {

  constructor(public http: HttpClient) {
  }

  getUrl () {
    let url = "http://192.168.43.179:8080";
    return url
  }

}
