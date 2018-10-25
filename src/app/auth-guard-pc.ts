import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route} from '@angular/router';
import {isNullOrUndefined} from 'util';
declare var $: any;
import {environment} from '../environments/environment';

@Injectable()
export class PcGuard implements CanActivate {
    constructor(private router: Router) {

    }

    canLoad(route: Route): boolean {
        const url = `/${route.path}`;
        return this.checkLogin(url);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if ($(window).width() > 768) {
            localStorage.clear();
            window.location.href = environment.pc;
            return false;
        }

        return true;
    }
}
