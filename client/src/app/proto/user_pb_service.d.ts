// package: traveller
// file: user.proto

import * as user_pb from "./user_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import {grpc} from "@improbable-eng/grpc-web";

type UserServiceCreateUser = {
  readonly methodName: string;
  readonly service: typeof UserService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof user_pb.CreateUserRequest;
  readonly responseType: typeof user_pb.CreateUserResponse;
};

type UserServiceGetAllUser = {
  readonly methodName: string;
  readonly service: typeof UserService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof user_pb.GetAllUserResponse;
};

type UserServiceGetUser = {
  readonly methodName: string;
  readonly service: typeof UserService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof user_pb.GetUserRequest;
  readonly responseType: typeof user_pb.GetUserResponse;
};

export class UserService {
  static readonly serviceName: string;
  static readonly CreateUser: UserServiceCreateUser;
  static readonly GetAllUser: UserServiceGetAllUser;
  static readonly GetUser: UserServiceGetUser;
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

export class UserServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  createUser(
    requestMessage: user_pb.CreateUserRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: user_pb.CreateUserResponse|null) => void
  ): UnaryResponse;
  createUser(
    requestMessage: user_pb.CreateUserRequest,
    callback: (error: ServiceError|null, responseMessage: user_pb.CreateUserResponse|null) => void
  ): UnaryResponse;
  getAllUser(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: user_pb.GetAllUserResponse|null) => void
  ): UnaryResponse;
  getAllUser(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: user_pb.GetAllUserResponse|null) => void
  ): UnaryResponse;
  getUser(
    requestMessage: user_pb.GetUserRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: user_pb.GetUserResponse|null) => void
  ): UnaryResponse;
  getUser(
    requestMessage: user_pb.GetUserRequest,
    callback: (error: ServiceError|null, responseMessage: user_pb.GetUserResponse|null) => void
  ): UnaryResponse;
}

