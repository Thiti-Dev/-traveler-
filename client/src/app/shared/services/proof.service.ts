import { Injectable } from '@angular/core';

import { ProofServiceClient } from '../../proto/proof_pb_service';
import {
  ProofThread,
  GetAllProofThreadResponse,
  ProofingRequest,
  ProofingResponse,
} from '../../proto/proof_pb';
import { grpc } from '@improbable-eng/grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb.js';
import { IResponseMapped } from '../interfaces/common.interface';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ProofService {
  client: ProofServiceClient;
  constructor(private authService: AuthService) {
    this.client = new ProofServiceClient('http://localhost:8080'); // envoy proxy server
  }

  public getActiveThreads(): Promise<
    IResponseMapped<GetAllProofThreadResponse.AsObject>
  > {
    return new Promise((resolve, reject) => {
      const req = new google_protobuf_empty_pb.Empty();
      const metadata = new grpc.Metadata();
      this.client.getAllProofThread(req, metadata, (err, response) => {
        if (err) {
          console.log(err);
          resolve({ success: false });
          return;
        }
        //console.log(response!.toObject().proofThreadsList);
        resolve({ success: true, data: response!.toObject() });
      });
    });
  }

  public proofTheSpecificThread(
    thread_id: number,
    code: string
  ): Promise<IResponseMapped<ProofingResponse.AsObject>> {
    return new Promise((resolve, reject) => {
      const req = new ProofingRequest();
      req.setThreadId(thread_id);
      req.setSecretCode(code);
      const metadata = new grpc.Metadata();
      metadata.set('authorization', localStorage.getItem('token')!);
      this.client.proofing(req, metadata, (err, response) => {
        if (err) {
          console.log(err);
          resolve({ success: false });
          return;
        }
        //console.log(response!.toObject());
        resolve({ success: true, data: response!.toObject() });
      });
    });
  }
}
