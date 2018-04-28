import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(
        private router: Router,
        private authService: AuthService) {}

    canActivate() {
        const idToken = localStorage.getItem('access_token');

        if (idToken != null && this.authService.isAuthenticated()) {
            console.log("AuthGuard pass");
            return true;
        }

        console.log("AuthGuard fail");
        this.router.navigate(['/login']);
        return false;
    }
}
