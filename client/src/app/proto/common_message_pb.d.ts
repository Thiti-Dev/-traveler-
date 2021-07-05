// package: traveller
// file: common_message.proto

import * as jspb from "google-protobuf";

export class ResultMsg extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResultMsg.AsObject;
  static toObject(includeInstance: boolean, msg: ResultMsg): ResultMsg.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ResultMsg, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResultMsg;
  static deserializeBinaryFromReader(message: ResultMsg, reader: jspb.BinaryReader): ResultMsg;
}

export namespace ResultMsg {
  export type AsObject = {
    success: boolean,
    message: string,
  }
}

