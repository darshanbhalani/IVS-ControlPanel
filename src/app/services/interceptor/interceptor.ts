import { HttpInterceptorFn } from "@angular/common/http";

export const tokenHttpInterceptor: HttpInterceptorFn = (req, next) => {

    const userString = sessionStorage.getItem('auth_token') || localStorage.getItem('auth_token');
    if (!userString) {
        console.error('No user found in sessionStorage');
        return next(req);
    }

    let user;
    try {
        user = JSON.parse(userString);
    } catch (error) {
        console.error('Error parsing user from sessionStorage', error);
        return next(req);
    }

    const token = user.token;

    if (!token) {
        console.error('No token found in user object');
        return next(req);
    }

    req = req.clone({
        setHeaders: {
            'Authorization': 'Bearer ' + token
        }
    });

    return next(req);
};