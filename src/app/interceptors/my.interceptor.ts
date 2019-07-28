import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const newRequest = req.clone({
        headers: req.headers.set('Authorization', '563492ad6f91700001000001f67f158d28224fa6997ef5300f6b82cf'),
    });
    return next.handle(newRequest);
    // tslint:disable-next-line:max-line-length
    // const customRequest = req.clone({ headers: req.headers.set('Authorization', '563492ad6f91700001000001f67f158d28224fa6997ef5300f6b82cf')});
    // return next.handle(customRequest);
  }
}
