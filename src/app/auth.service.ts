import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {LocalStorageService} from './localstorage.service';
import {Client} from './orders.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient
  ) { }

  login(username: string, password: string) {
    return this.http.post<Client>(`/api/login/authenticate`, { 'email': username, 'passwordHash': password })
      .pipe(map(user => {
        // login successful if there's a user in the response
        console.log('inside login method');
        console.log(user);
        if (user) {
          // store user details and basic auth credentials in local storage
          // to keep user logged in between page refreshes
          // user.authdata = window.btoa(JSON.stringify(user));
          LocalStorageService.save('currentUser', JSON.stringify(user));
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    // localStorage.removeItem('currentUser');
    LocalStorageService.remove('currentUser');
  }
}

/*
*
* clientId: {value: 3}
value: 3
email: "example                                           "
isAdmin: false
name: "Petr                                              "
surname: "Ivanov   */
