// package: traveller
// file: statistic.proto

import * as statistic_pb from "./statistic_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import {grpc} from "@improbable-eng/grpc-web";

type StatisticServiceGetTotalUser = {
  readonly methodName: string;
  readonly service: typeof StatisticService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof statistic_pb.GetTotalUserResponse;
};

type StatisticServiceGetTotalSolvedThread = {
  readonly methodName: string;
  readonly service: typeof StatisticService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof statistic_pb.GetTotalSolvedThreadResponse;
};

type StatisticServiceGetTotalTraveler = {
  readonly methodName: string;
  readonly service: typeof StatisticService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof statistic_pb.GetTotalTravelerResponse;
};

type StatisticServiceGetUserStatistic = {
  readonly methodName: string;
  readonly service: typeof StatisticService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof statistic_pb.GetUserStatisticRequest;
  readonly responseType: typeof statistic_pb.GetUserStatisticResponse;
};

export class StatisticService {
  static readonly serviceName: string;
  static readonly GetTotalUser: StatisticServiceGetTotalUser;
  static readonly GetTotalSolvedThread: StatisticServiceGetTotalSolvedThread;
  static readonly GetTotalTraveler: StatisticServiceGetTotalTraveler;
  static readonly GetUserStatistic: StatisticServiceGetUserStatistic;
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

export class StatisticServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getTotalUser(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: statistic_pb.GetTotalUserResponse|null) => void
  ): UnaryResponse;
  getTotalUser(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: statistic_pb.GetTotalUserResponse|null) => void
  ): UnaryResponse;
  getTotalSolvedThread(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: statistic_pb.GetTotalSolvedThreadResponse|null) => void
  ): UnaryResponse;
  getTotalSolvedThread(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: statistic_pb.GetTotalSolvedThreadResponse|null) => void
  ): UnaryResponse;
  getTotalTraveler(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: statistic_pb.GetTotalTravelerResponse|null) => void
  ): UnaryResponse;
  getTotalTraveler(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: statistic_pb.GetTotalTravelerResponse|null) => void
  ): UnaryResponse;
  getUserStatistic(
    requestMessage: statistic_pb.GetUserStatisticRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: statistic_pb.GetUserStatisticResponse|null) => void
  ): UnaryResponse;
  getUserStatistic(
    requestMessage: statistic_pb.GetUserStatisticRequest,
    callback: (error: ServiceError|null, responseMessage: statistic_pb.GetUserStatisticResponse|null) => void
  ): UnaryResponse;
}

