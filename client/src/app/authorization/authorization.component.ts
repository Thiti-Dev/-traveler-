import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { AuthService } from '../shared/services/auth.service';
import { ToastService } from '../shared/services/toast.service';

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
  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/proof-thread']);
    }
  }

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

  async onGetIn(formData: IAuthCredentials) {
    if (this.authCredentials.invalid) {
      return;
    }
    console.log(formData);
    // TODO make a call request to the (rpc)Login
    this.login_in_process = true;

    const mapped_response = await this.authService.login(formData);
    if (mapped_response.success) {
      const token = mapped_response.data!.accessToken;
      const authenticated = this.authService.decodeTokenAndStoreIfValid(token);
      if (!authenticated) {
        return this.toastService.showToastMessage(DialogLayoutDisplay.DANGER, {
          title: 'Error',
          message: 'username or password is incorrect',
        });
      }
      this.toastService.showToastMessage(DialogLayoutDisplay.SUCCESS, {
        title: 'You are allowed to get in',
        message: 'Redirecting in 2 seconds . . .',
      });
      setTimeout(() => {
        this.router.navigate(['/proof-thread']);
      }, 2000);
    } else {
      if (mapped_response.code === 'CredentialNotValid') {
        console.log('Username/password is invalid');
        this.toastService.showToastMessage(DialogLayoutDisplay.DANGER, {
          title: 'Error',
          message: 'username or password is incorrect',
        });
      }
    }
    this.login_in_process = false;
  }
}
