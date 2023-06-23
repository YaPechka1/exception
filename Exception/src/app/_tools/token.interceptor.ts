import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators'
import { AuthService } from '../_services/auth.service';
import { PathService } from '../_services/path.service';
@Injectable()

export class TokenInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private authService: AuthService, private path: PathService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        let authReq = req;
        // console.log(req);
        const token = localStorage.getItem('token');
        if (token != null) {
            authReq = this.addTokenHeader(req, token);
        }

        return next.handle(authReq).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && !(authReq.url == this.path.path+'api/auth/login') && !(authReq.url ==this.path.path+'api/auth/loginOnToken') && error.status === 401) {
                return this.handle401Error(authReq, next);
            }
            return throwError(error);
        }));
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            const token = localStorage.getItem('tokenUpdate');
            const id_user = localStorage.getItem('id_user');
            console.log(12)
            if (token && id_user)
                return this.authService.refreshToken(token, id_user).pipe(
                    switchMap((token: any) => {
                        this.isRefreshing = false;
                        localStorage.setItem('token', token.token);
                        localStorage.setItem('tokenUpdate', token.tokenUpdate);
                        this.refreshTokenSubject.next(token.token);

                        return next.handle(this.addTokenHeader(request, token.token));
                    }),
                    catchError((err) => {
                        this.isRefreshing = false;

                        localStorage.clear();
                        return throwError(err);
                    })
                );
        }

        return this.refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap((token) => next.handle(this.addTokenHeader(request, token)))
        );
    }

    private addTokenHeader(request: HttpRequest<any>, token: string) {
        /* for Spring Boot back-end */
        // return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });

        /* for Node.js Express back-end */
        return request.clone({ headers: request.headers.set('Authorization', token) });
    }

}