import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

let invalid_msg_packs = {
  username: {
    required: 'You mush tell us who you are or remain un-authorizaed',
  },
  password: {
    required:
      'This is not the place where you can walk in and being someone else . . .',
  },
};

interface IAuthCredentials {
  username: string;
  password: string;
}

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  //
  // ─── VARS ───────────────────────────────────────────────────────────────────────
  //
  authCredentials = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  login_in_process = false;
  // ────────────────────────────────────────────────────────────────────────────────

  getSpecificFormGroupErrorMessage(fg: FormGroup, key: string) {
    if (fg.get(key)?.hasError('required')) {
      return invalid_msg_packs[key as keyof typeof invalid_msg_packs].required;
    }
    return '';
  }

  onGetIn(formData: IAuthCredentials) {
    if (this.authCredentials.invalid) {
      return;
    }
    console.log(formData);
    // TODO make a call request to the (rpc)Login
    this.login_in_process = true;
  }
}
