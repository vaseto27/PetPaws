import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { catchError, Observable, switchMap, throwError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const accessToken = this.authService.getAccessToken();
      const authReq = accessToken ? req.clone({
        setHeaders: {Authorization: `Bearer ${accessToken}`}
      }) : req;

      return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if(error.status === 401) {
            return this.authService.refreshToken().pipe(
              switchMap(() => {
                const newAccessToken = this.authService.getAccessToken();
                const retryReq = req.clone({
                  setHeaders: {Authorization: `Bearer ${newAccessToken}`}
                });
                return next.handle(retryReq)
              }),
              catchError(err => {
                this.authService.logout();
                return throwError(err)
              })
            )
          }
          return throwError(error)
        })
      )
  }
}
