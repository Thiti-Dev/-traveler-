import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  username = new FormControl('', [Validators.required]); //TODO orderized in formControlGroup
  password = new FormControl('', [Validators.required]); //TODO orderized in formControlGroup

  getUsernameErrorMessage() {
    return this.username.hasError('required')
      ? 'You mush tell us who you are or remain un-authorizaed'
      : '';
  }
  getPasswordErrorMessage() {
    return this.password.hasError('required')
      ? 'This is not the place where you can walk in and being someone else . . .'
      : '';
  }

  onGetIn() {
    console.log(this.username.value, this.password.value);
  }
}
