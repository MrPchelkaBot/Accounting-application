import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router, private authService: AuthService) {
  }
  canActivate(): Promise<boolean> {
    return this.authService.getToken().then((token: string) => {
      if (token && !this.jwtHelper.isTokenExpired(token)) {
        return true;
      }
      this.router.navigate(['login']);
      return false;
    }).catch(() => {
      this.router.navigate(['login']);
      return false;
    })
  }
}