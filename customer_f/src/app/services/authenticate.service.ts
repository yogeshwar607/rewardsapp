import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(currentUser != null){
        this.token = currentUser.token;

        }
    }

    login(input: string, password: string): Observable<any> {
        return this.http.post('http://localhost:4700/api/v1/customer/login', { input: input, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json().data.token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ name: response.json().data.user.name,_id: response.json().data.user._id, token: token }));
                    let obj = response.json().data ;
                    // return true to indicate successful login
                    return obj;
                } else {
                    // return false to indicate failed login
                    let obj = response.json().data ;
                    return obj;
                }
            });
    }

    logout() {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}