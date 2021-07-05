import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthServiceClient } from '../../proto/auth_pb_service';
import { LoginRequest, LoginResponse } from '../../proto/auth_pb';
import {
  IAuthCredentials,
  ITokenSignature,
} from '../models/authorization.model';

import { grpc } from '@improbable-eng/grpc-web';
import { IResponseMapped } from '../interfaces/common.interface';

import jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private client: AuthServiceClient;
  public isAuthenticated: boolean | null; // null indicated the the app just run
  public userData: ITokenSignature | null;
  constructor(private router: Router) {
    this.client = new AuthServiceClient('http://localhost:8080'); // envoy proxy server
    this.isAuthenticated = null; // by default
    this.userData = null;
    this.hydrateAuthenticationStateFromLocalStorage(); // hydrate on first construtor runs
  }

  public hydrateAuthenticationStateFromLocalStorage() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.isAuthenticated = false; // flagged as false
      return;
    }
    this.decodeTokenAndStoreIfValid(token);
  }

  public decodeTokenAndStoreIfValid(token: string): boolean {
    const decoded_data = jwt_decode(token) as ITokenSignature;
    // check if already expired or not
    if (Date.now() / 1000 >= decoded_data.exp) {
      this.isAuthenticated = false;
      return false;
    }
    // ─────────────────────────────────────────────────────────────────

    this.userData = decoded_data;
    this.isAuthenticated = true;
    console.log(decoded_data);
    localStorage.setItem('token', token);
    return true;
  }

  public login(
    cred: IAuthCredentials
  ): Promise<IResponseMapped<LoginResponse.AsObject>> {
    return new Promise((resolve, reject) => {
      const req = new LoginRequest();
      req.setUsername(cred.username);
      req.setPassword(cred.password);
      const metadata = new grpc.Metadata();
      this.client.login(req, metadata, (err, response) => {
        if (err) {
          if (err.code === grpc.Code.NotFound) {
            return resolve({ success: false, code: 'CredentialNotValid' });
          }
          return resolve({ success: false, code: 'InternalError' });
        }
        // might call decodeTokenAndStoreIfValid here if needed
        resolve({ success: true, data: response!.toObject() });
      });
    });
  }
}
