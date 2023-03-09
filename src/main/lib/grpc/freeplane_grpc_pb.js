// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var freeplane_pb = require('./freeplane_pb.js');

function serialize_freeplane_CreateChildRequest(arg) {
  if (!(arg instanceof freeplane_pb.CreateChildRequest)) {
    throw new Error('Expected argument of type freeplane.CreateChildRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_freeplane_CreateChildRequest(buffer_arg) {
  return freeplane_pb.CreateChildRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_freeplane_CreateChildResponse(arg) {
  if (!(arg instanceof freeplane_pb.CreateChildResponse)) {
    throw new Error('Expected argument of type freeplane.CreateChildResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_freeplane_CreateChildResponse(buffer_arg) {
  return freeplane_pb.CreateChildResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_freeplane_DeleteChildRequest(arg) {
  if (!(arg instanceof freeplane_pb.DeleteChildRequest)) {
    throw new Error('Expected argument of type freeplane.DeleteChildRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_freeplane_DeleteChildRequest(buffer_arg) {
  return freeplane_pb.DeleteChildRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_freeplane_DeleteChildResponse(arg) {
  if (!(arg instanceof freeplane_pb.DeleteChildResponse)) {
    throw new Error('Expected argument of type freeplane.DeleteChildResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_freeplane_DeleteChildResponse(buffer_arg) {
  return freeplane_pb.DeleteChildResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_freeplane_GroovyRequest(arg) {
  if (!(arg instanceof freeplane_pb.GroovyRequest)) {
    throw new Error('Expected argument of type freeplane.GroovyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_freeplane_GroovyRequest(buffer_arg) {
  return freeplane_pb.GroovyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_freeplane_GroovyResponse(arg) {
  if (!(arg instanceof freeplane_pb.GroovyResponse)) {
    throw new Error('Expected argument of type freeplane.GroovyResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_freeplane_GroovyResponse(buffer_arg) {
  return freeplane_pb.GroovyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_freeplane_NodeAttributeAddRequest(arg) {
  if (!(arg instanceof freeplane_pb.NodeAttributeAddRequest)) {
    throw new Error('Expected argument of type freeplane.NodeAttributeAddRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_freeplane_NodeAttributeAddRequest(buffer_arg) {
  return freeplane_pb.NodeAttributeAddRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_freeplane_NodeAttributeAddResponse(arg) {
  if (!(arg instanceof freeplane_pb.NodeAttributeAddResponse)) {
    throw new Error('Expected argument of type freeplane.NodeAttributeAddResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_freeplane_NodeAttributeAddResponse(buffer_arg) {
  return freeplane_pb.NodeAttributeAddResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_freeplane_NodeBackgroundColorSetRequest(arg) {
  if (!(arg instanceof freeplane_pb.NodeBackgroundColorSetRequest)) {
    throw new Error('Expected argument of type freeplane.NodeBackgroundColorSetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_freeplane_NodeBackgroundColorSetRequest(buffer_arg) {
  return freeplane_pb.NodeBackgroundColorSetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_freeplane_NodeBackgroundColorSetResponse(arg) {
  if (!(arg instanceof freeplane_pb.NodeBackgroundColorSetResponse)) {
    throw new Error('Expected argument of type freeplane.NodeBackgroundColorSetResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_freeplane_NodeBackgroundColorSetResponse(buffer_arg) {
  return freeplane_pb.NodeBackgroundColorSetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_freeplane_NodeColorSetRequest(arg) {
  if (!(arg instanceof freeplane_pb.NodeColorSetRequest)) {
    throw new Error('Expected argument of type freeplane.NodeColorSetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_freeplane_NodeColorSetRequest(buffer_arg) {
  return freeplane_pb.NodeColorSetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_freeplane_NodeColorSetResponse(arg) {
  if (!(arg instanceof freeplane_pb.NodeColorSetResponse)) {
    throw new Error('Expected argument of type freeplane.NodeColorSetResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_freeplane_NodeColorSetResponse(buffer_arg) {
  return freeplane_pb.NodeColorSetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_freeplane_NodeDetailsSetRequest(arg) {
  if (!(arg instanceof freeplane_pb.NodeDetailsSetRequest)) {
    throw new Error('Expected argument of type freeplane.NodeDetailsSetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_freeplane_NodeDetailsSetRequest(buffer_arg) {
  return freeplane_pb.NodeDetailsSetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_freeplane_NodeDetailsSetResponse(arg) {
  if (!(arg instanceof freeplane_pb.NodeDetailsSetResponse)) {
    throw new Error('Expected argument of type freeplane.NodeDetailsSetResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_freeplane_NodeDetailsSetResponse(buffer_arg) {
  return freeplane_pb.NodeDetailsSetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_freeplane_NodeLinkSetRequest(arg) {
  if (!(arg instanceof freeplane_pb.NodeLinkSetRequest)) {
    throw new Error('Expected argument of type freeplane.NodeLinkSetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_freeplane_NodeLinkSetRequest(buffer_arg) {
  return freeplane_pb.NodeLinkSetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_freeplane_NodeLinkSetResponse(arg) {
  if (!(arg instanceof freeplane_pb.NodeLinkSetResponse)) {
    throw new Error('Expected argument of type freeplane.NodeLinkSetResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_freeplane_NodeLinkSetResponse(buffer_arg) {
  return freeplane_pb.NodeLinkSetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var FreeplaneService = exports.FreeplaneService = {
  createChild: {
    path: '/freeplane.Freeplane/CreateChild',
    requestStream: false,
    responseStream: false,
    requestType: freeplane_pb.CreateChildRequest,
    responseType: freeplane_pb.CreateChildResponse,
    requestSerialize: serialize_freeplane_CreateChildRequest,
    requestDeserialize: deserialize_freeplane_CreateChildRequest,
    responseSerialize: serialize_freeplane_CreateChildResponse,
    responseDeserialize: deserialize_freeplane_CreateChildResponse,
  },
  deleteChild: {
    path: '/freeplane.Freeplane/DeleteChild',
    requestStream: false,
    responseStream: false,
    requestType: freeplane_pb.DeleteChildRequest,
    responseType: freeplane_pb.DeleteChildResponse,
    requestSerialize: serialize_freeplane_DeleteChildRequest,
    requestDeserialize: deserialize_freeplane_DeleteChildRequest,
    responseSerialize: serialize_freeplane_DeleteChildResponse,
    responseDeserialize: deserialize_freeplane_DeleteChildResponse,
  },
  nodeAttributeAdd: {
    path: '/freeplane.Freeplane/NodeAttributeAdd',
    requestStream: false,
    responseStream: false,
    requestType: freeplane_pb.NodeAttributeAddRequest,
    responseType: freeplane_pb.NodeAttributeAddResponse,
    requestSerialize: serialize_freeplane_NodeAttributeAddRequest,
    requestDeserialize: deserialize_freeplane_NodeAttributeAddRequest,
    responseSerialize: serialize_freeplane_NodeAttributeAddResponse,
    responseDeserialize: deserialize_freeplane_NodeAttributeAddResponse,
  },
  nodeLinkSet: {
    path: '/freeplane.Freeplane/NodeLinkSet',
    requestStream: false,
    responseStream: false,
    requestType: freeplane_pb.NodeLinkSetRequest,
    responseType: freeplane_pb.NodeLinkSetResponse,
    requestSerialize: serialize_freeplane_NodeLinkSetRequest,
    requestDeserialize: deserialize_freeplane_NodeLinkSetRequest,
    responseSerialize: serialize_freeplane_NodeLinkSetResponse,
    responseDeserialize: deserialize_freeplane_NodeLinkSetResponse,
  },
  nodeDetailsSet: {
    path: '/freeplane.Freeplane/NodeDetailsSet',
    requestStream: false,
    responseStream: false,
    requestType: freeplane_pb.NodeDetailsSetRequest,
    responseType: freeplane_pb.NodeDetailsSetResponse,
    requestSerialize: serialize_freeplane_NodeDetailsSetRequest,
    requestDeserialize: deserialize_freeplane_NodeDetailsSetRequest,
    responseSerialize: serialize_freeplane_NodeDetailsSetResponse,
    responseDeserialize: deserialize_freeplane_NodeDetailsSetResponse,
  },
  groovy: {
    path: '/freeplane.Freeplane/Groovy',
    requestStream: false,
    responseStream: false,
    requestType: freeplane_pb.GroovyRequest,
    responseType: freeplane_pb.GroovyResponse,
    requestSerialize: serialize_freeplane_GroovyRequest,
    requestDeserialize: deserialize_freeplane_GroovyRequest,
    responseSerialize: serialize_freeplane_GroovyResponse,
    responseDeserialize: deserialize_freeplane_GroovyResponse,
  },
  nodeColorSet: {
    path: '/freeplane.Freeplane/NodeColorSet',
    requestStream: false,
    responseStream: false,
    requestType: freeplane_pb.NodeColorSetRequest,
    responseType: freeplane_pb.NodeColorSetResponse,
    requestSerialize: serialize_freeplane_NodeColorSetRequest,
    requestDeserialize: deserialize_freeplane_NodeColorSetRequest,
    responseSerialize: serialize_freeplane_NodeColorSetResponse,
    responseDeserialize: deserialize_freeplane_NodeColorSetResponse,
  },
  nodeBackgroundColorSet: {
    path: '/freeplane.Freeplane/NodeBackgroundColorSet',
    requestStream: false,
    responseStream: false,
    requestType: freeplane_pb.NodeBackgroundColorSetRequest,
    responseType: freeplane_pb.NodeBackgroundColorSetResponse,
    requestSerialize: serialize_freeplane_NodeBackgroundColorSetRequest,
    requestDeserialize: deserialize_freeplane_NodeBackgroundColorSetRequest,
    responseSerialize: serialize_freeplane_NodeBackgroundColorSetResponse,
    responseDeserialize: deserialize_freeplane_NodeBackgroundColorSetResponse,
  },
};

exports.FreeplaneClient = grpc.makeGenericClientConstructor(FreeplaneService);
