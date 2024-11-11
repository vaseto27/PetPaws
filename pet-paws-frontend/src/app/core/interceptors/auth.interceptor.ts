// auth.interceptor.ts
import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

// Define the interceptor as a functional interceptor (HttpInterceptorFn)
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const accessToken = authService.getAccessToken();

  console.log('Access Token:', accessToken);  // Verify that this logs

  if (accessToken) {
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
    });
    return next(clonedRequest);  // Correctly pass the cloned request to next handler
  }

  return next(req);  // Proceed with original request if no token
};
