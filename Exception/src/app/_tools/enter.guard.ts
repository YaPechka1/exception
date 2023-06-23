import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import {Injectable} from '@angular/core'
import { AuthService } from "../_services/auth.service";

@Injectable({
providedIn:'root'
})

export class EnterGuard implements CanActivate, CanActivateChild{
    constructor(private auth:AuthService, private router:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>{
        if (!this.auth.isEnter()){
            return of(true);
        }
        else {
    this.router.navigate(['/profile'])
    return of(false);
        }
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(route, state);
    }
}