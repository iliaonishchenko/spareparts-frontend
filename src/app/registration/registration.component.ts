import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {AuthenticationService, Credentials} from '../auth.service';
import {Client, ClientId} from '../orders.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  name;
  surname;
  email;
  password;

  registrationDone = false;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.name = new FormControl('');
    this.surname = new FormControl('');
    this.email = new FormControl('');
    this.password = new FormControl('');
  }

  doRegistration(): void {
    const client: Client = new Client(new ClientId(-10), this.name.value, this.surname.value, this.email.value, false);
    const cred: Credentials = new Credentials(this.email.value, this.password.value);

    this.authenticationService.createClient(client).subscribe(bClient => {
      console.log('client was created: ' + bClient);
      this.authenticationService.createCredentials(cred).subscribe(bCred => {
        console.log('creds was created: ' + bCred);
        this.registrationDone = true;
      });
    });
  }
}
