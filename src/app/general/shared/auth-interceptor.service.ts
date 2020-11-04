import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { messages } from './messages';
import { LogoutServiceService } from './logout-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private logoutService :LogoutServiceService
  ) {}

  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    const token: string = localStorage.getItem(messages.variableUserSession);

    let request = req;

    const urlRequest=this.activatedRoute.snapshot['_routerState'].url;

    if(urlRequest !=messages.urlLogin && token == null){
      this.logoutService.logout();
      this.router.navigateByUrl(messages.urlLogin);
    }


    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

       if (err.status === messages.statusCode504) {
          this.logoutService.logout();
          this.router.navigateByUrl(messages.urlLogin);
          return throwError(messages.unavaibleError);
        }
        if (err.status === messages.statusCode400) {
          return throwError(messages.badRequestError);
        }
        return throwError( err);

      })
    );
  }

}