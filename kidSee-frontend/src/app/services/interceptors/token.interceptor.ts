import { Observable } from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
  } from '@angular/common/http';

export class TokenInterceptor implements HttpInterceptor {

    private storage: Storage;
    constructor() {
        this.storage = window.localStorage;
     }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
               'Authorization': 'Bearer ' + this.storage.getItem('token')
              }
          });
          return next.handle(request);
  }
}
