// package: traveller
// file: proof.proto

import * as proof_pb from "./proof_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import {grpc} from "@improbable-eng/grpc-web";

type ProofServiceCreateProofThread = {
  readonly methodName: string;
  readonly service: typeof ProofService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proof_pb.CreateProofThreadRequest;
  readonly responseType: typeof proof_pb.CreateProofThreadResponse;
};

type ProofServiceGetAllProofThread = {
  readonly methodName: string;
  readonly service: typeof ProofService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof proof_pb.GetAllProofThreadResponse;
};

type ProofServiceRemoveProofThread = {
  readonly methodName: string;
  readonly service: typeof ProofService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proof_pb.RemoveProofThreadRequest;
  readonly responseType: typeof proof_pb.RemoveProofThreadResponse;
};

type ProofServiceProofing = {
  readonly methodName: string;
  readonly service: typeof ProofService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proof_pb.ProofingRequest;
  readonly responseType: typeof proof_pb.ProofingResponse;
};

export class ProofService {
  static readonly serviceName: string;
  static readonly CreateProofThread: ProofServiceCreateProofThread;
  static readonly GetAllProofThread: ProofServiceGetAllProofThread;
  static readonly RemoveProofThread: ProofServiceRemoveProofThread;
  static readonly Proofing: ProofServiceProofing;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class ProofServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  createProofThread(
    requestMessage: proof_pb.CreateProofThreadRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proof_pb.CreateProofThreadResponse|null) => void
  ): UnaryResponse;
  createProofThread(
    requestMessage: proof_pb.CreateProofThreadRequest,
    callback: (error: ServiceError|null, responseMessage: proof_pb.CreateProofThreadResponse|null) => void
  ): UnaryResponse;
  getAllProofThread(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proof_pb.GetAllProofThreadResponse|null) => void
  ): UnaryResponse;
  getAllProofThread(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: proof_pb.GetAllProofThreadResponse|null) => void
  ): UnaryResponse;
  removeProofThread(
    requestMessage: proof_pb.RemoveProofThreadRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proof_pb.RemoveProofThreadResponse|null) => void
  ): UnaryResponse;
  removeProofThread(
    requestMessage: proof_pb.RemoveProofThreadRequest,
    callback: (error: ServiceError|null, responseMessage: proof_pb.RemoveProofThreadResponse|null) => void
  ): UnaryResponse;
  proofing(
    requestMessage: proof_pb.ProofingRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proof_pb.ProofingResponse|null) => void
  ): UnaryResponse;
  proofing(
    requestMessage: proof_pb.ProofingRequest,
    callback: (error: ServiceError|null, responseMessage: proof_pb.ProofingResponse|null) => void
  ): UnaryResponse;
}

