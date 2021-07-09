// package: traveller
// file: statistic.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class GetTotalUserResponse extends jspb.Message {
  getTotalUser(): number;
  setTotalUser(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTotalUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTotalUserResponse): GetTotalUserResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTotalUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTotalUserResponse;
  static deserializeBinaryFromReader(message: GetTotalUserResponse, reader: jspb.BinaryReader): GetTotalUserResponse;
}

export namespace GetTotalUserResponse {
  export type AsObject = {
    totalUser: number,
  }
}

export class GetTotalSolvedThreadResponse extends jspb.Message {
  getTotalSolvedThread(): number;
  setTotalSolvedThread(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTotalSolvedThreadResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTotalSolvedThreadResponse): GetTotalSolvedThreadResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTotalSolvedThreadResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTotalSolvedThreadResponse;
  static deserializeBinaryFromReader(message: GetTotalSolvedThreadResponse, reader: jspb.BinaryReader): GetTotalSolvedThreadResponse;
}

export namespace GetTotalSolvedThreadResponse {
  export type AsObject = {
    totalSolvedThread: number,
  }
}

export class GetTotalTravelerResponse extends jspb.Message {
  getTotalTravler(): number;
  setTotalTravler(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTotalTravelerResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTotalTravelerResponse): GetTotalTravelerResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTotalTravelerResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTotalTravelerResponse;
  static deserializeBinaryFromReader(message: GetTotalTravelerResponse, reader: jspb.BinaryReader): GetTotalTravelerResponse;
}

export namespace GetTotalTravelerResponse {
  export type AsObject = {
    totalTravler: number,
  }
}

export class GetUserStatisticRequest extends jspb.Message {
  getUserId(): number;
  setUserId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserStatisticRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserStatisticRequest): GetUserStatisticRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetUserStatisticRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserStatisticRequest;
  static deserializeBinaryFromReader(message: GetUserStatisticRequest, reader: jspb.BinaryReader): GetUserStatisticRequest;
}

export namespace GetUserStatisticRequest {
  export type AsObject = {
    userId: number,
  }
}

export class GetUserStatisticResponse extends jspb.Message {
  getThreadCreated(): number;
  setThreadCreated(value: number): void;

  getThreadCracked(): number;
  setThreadCracked(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserStatisticResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserStatisticResponse): GetUserStatisticResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetUserStatisticResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserStatisticResponse;
  static deserializeBinaryFromReader(message: GetUserStatisticResponse, reader: jspb.BinaryReader): GetUserStatisticResponse;
}

export namespace GetUserStatisticResponse {
  export type AsObject = {
    threadCreated: number,
    threadCracked: number,
  }
}

