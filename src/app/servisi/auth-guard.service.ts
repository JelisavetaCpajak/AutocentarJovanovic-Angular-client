import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {map, take} from 'rxjs/operators';
import { ZaposleniService } from './zaposleni.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private zaposleniService: ZaposleniService,
              private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
   boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.zaposleniService.prijavljeniZaposleni.pipe(
      take(1),
      map(user => {
      const isAuth =  !!user;
      if (isAuth) {
        return true;
      }
      return this.router.createUrlTree(['/login']);
    }));
  }
}
