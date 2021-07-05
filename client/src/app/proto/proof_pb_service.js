// package: traveller
// file: proof.proto

var proof_pb = require("./proof_pb");
var google_protobuf_empty_pb = require("google-protobuf/google/protobuf/empty_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var ProofService = (function () {
  function ProofService() {}
  ProofService.serviceName = "traveller.ProofService";
  return ProofService;
}());

ProofService.CreateProofThread = {
  methodName: "CreateProofThread",
  service: ProofService,
  requestStream: false,
  responseStream: false,
  requestType: proof_pb.CreateProofThreadRequest,
  responseType: proof_pb.CreateProofThreadResponse
};

ProofService.GetAllProofThread = {
  methodName: "GetAllProofThread",
  service: ProofService,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: proof_pb.GetAllProofThreadResponse
};

ProofService.RemoveProofThread = {
  methodName: "RemoveProofThread",
  service: ProofService,
  requestStream: false,
  responseStream: false,
  requestType: proof_pb.RemoveProofThreadRequest,
  responseType: proof_pb.RemoveProofThreadResponse
};

exports.ProofService = ProofService;

function ProofServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ProofServiceClient.prototype.createProofThread = function createProofThread(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProofService.CreateProofThread, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ProofServiceClient.prototype.getAllProofThread = function getAllProofThread(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProofService.GetAllProofThread, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ProofServiceClient.prototype.removeProofThread = function removeProofThread(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ProofService.RemoveProofThread, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.ProofServiceClient = ProofServiceClient;

