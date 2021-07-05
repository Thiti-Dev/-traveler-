// package: traveller
// file: proof.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as common_message_pb from "./common_message_pb";

export class ProofThread extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getCreatorId(): number;
  setCreatorId(value: number): void;

  getContentMsg(): string;
  setContentMsg(value: string): void;

  getSecretCode(): string;
  setSecretCode(value: string): void;

  hasCreatedAt(): boolean;
  clearCreatedAt(): void;
  getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getAmountOfDayWouldBeLastUntil(): number;
  setAmountOfDayWouldBeLastUntil(value: number): void;

  hasRevealAt(): boolean;
  clearRevealAt(): void;
  getRevealAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setRevealAt(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getIsSolved(): boolean;
  setIsSolved(value: boolean): void;

  getSolverId(): number;
  setSolverId(value: number): void;

  getSolverAka(): string;
  setSolverAka(value: string): void;

  hasSolvedAt(): boolean;
  clearSolvedAt(): void;
  getSolvedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setSolvedAt(value?: google_protobuf_timestamp_pb.Timestamp): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProofThread.AsObject;
  static toObject(includeInstance: boolean, msg: ProofThread): ProofThread.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProofThread, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProofThread;
  static deserializeBinaryFromReader(message: ProofThread, reader: jspb.BinaryReader): ProofThread;
}

export namespace ProofThread {
  export type AsObject = {
    id: number,
    creatorId: number,
    contentMsg: string,
    secretCode: string,
    createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    amountOfDayWouldBeLastUntil: number,
    revealAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    isSolved: boolean,
    solverId: number,
    solverAka: string,
    solvedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class CreateProofThreadRequest extends jspb.Message {
  getContentMsg(): string;
  setContentMsg(value: string): void;

  getAmountOfDayWouldBeLastUntil(): number;
  setAmountOfDayWouldBeLastUntil(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateProofThreadRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateProofThreadRequest): CreateProofThreadRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateProofThreadRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateProofThreadRequest;
  static deserializeBinaryFromReader(message: CreateProofThreadRequest, reader: jspb.BinaryReader): CreateProofThreadRequest;
}

export namespace CreateProofThreadRequest {
  export type AsObject = {
    contentMsg: string,
    amountOfDayWouldBeLastUntil: number,
  }
}

export class CreateProofThreadResponse extends jspb.Message {
  hasProofThread(): boolean;
  clearProofThread(): void;
  getProofThread(): ProofThread | undefined;
  setProofThread(value?: ProofThread): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateProofThreadResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateProofThreadResponse): CreateProofThreadResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateProofThreadResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateProofThreadResponse;
  static deserializeBinaryFromReader(message: CreateProofThreadResponse, reader: jspb.BinaryReader): CreateProofThreadResponse;
}

export namespace CreateProofThreadResponse {
  export type AsObject = {
    proofThread?: ProofThread.AsObject,
  }
}

export class GetAllProofThreadResponse extends jspb.Message {
  clearProofThreadsList(): void;
  getProofThreadsList(): Array<ProofThread>;
  setProofThreadsList(value: Array<ProofThread>): void;
  addProofThreads(value?: ProofThread, index?: number): ProofThread;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAllProofThreadResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetAllProofThreadResponse): GetAllProofThreadResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAllProofThreadResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAllProofThreadResponse;
  static deserializeBinaryFromReader(message: GetAllProofThreadResponse, reader: jspb.BinaryReader): GetAllProofThreadResponse;
}

export namespace GetAllProofThreadResponse {
  export type AsObject = {
    proofThreadsList: Array<ProofThread.AsObject>,
  }
}

export class RemoveProofThreadRequest extends jspb.Message {
  getThreadId(): string;
  setThreadId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RemoveProofThreadRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RemoveProofThreadRequest): RemoveProofThreadRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RemoveProofThreadRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RemoveProofThreadRequest;
  static deserializeBinaryFromReader(message: RemoveProofThreadRequest, reader: jspb.BinaryReader): RemoveProofThreadRequest;
}

export namespace RemoveProofThreadRequest {
  export type AsObject = {
    threadId: string,
  }
}

export class RemoveProofThreadResponse extends jspb.Message {
  hasResultMsg(): boolean;
  clearResultMsg(): void;
  getResultMsg(): common_message_pb.ResultMsg | undefined;
  setResultMsg(value?: common_message_pb.ResultMsg): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RemoveProofThreadResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RemoveProofThreadResponse): RemoveProofThreadResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RemoveProofThreadResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RemoveProofThreadResponse;
  static deserializeBinaryFromReader(message: RemoveProofThreadResponse, reader: jspb.BinaryReader): RemoveProofThreadResponse;
}

export namespace RemoveProofThreadResponse {
  export type AsObject = {
    resultMsg?: common_message_pb.ResultMsg.AsObject,
  }
}

