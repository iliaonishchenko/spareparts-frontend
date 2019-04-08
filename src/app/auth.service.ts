import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {LocalStorageService} from './localstorage.service';
import {Client} from './orders.service';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<Client>(`/api/login/authenticate`, { 'email': username, 'passwordHash': password })
      .pipe(map(user => {
        // login successful if there's a client in the response
        console.log('inside login method');
        console.log(user);
        if (user) {
          // store client details and basic auth credentials in local storage
          // to keep client logged in between page refreshes
          // client.authdata = window.btoa(JSON.stringify(client));
          LocalStorageService.save('currentUser', JSON.stringify(user));
        }
        return user;
      }));
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>('/api/clients', client);
  }

  createCredentials(cred: Credentials): Observable<Credentials> {
    return this.http.post<Credentials>('/api/credentials', cred);
  }

  logout() {
    // remove client from local storage to log client out
    // localStorage.removeItem('currentUser');
    LocalStorageService.remove('currentUser');
  }
}

export class Credentials {
  email: string;
  passwordHash: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.passwordHash = password;
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
