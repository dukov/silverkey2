// package: freeplane
// file: freeplane.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as freeplane_pb from "./freeplane_pb";

interface IFreeplaneService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createChild: IFreeplaneService_ICreateChild;
    deleteChild: IFreeplaneService_IDeleteChild;
    nodeAttributeAdd: IFreeplaneService_INodeAttributeAdd;
    nodeLinkSet: IFreeplaneService_INodeLinkSet;
    nodeDetailsSet: IFreeplaneService_INodeDetailsSet;
    groovy: IFreeplaneService_IGroovy;
    nodeColorSet: IFreeplaneService_INodeColorSet;
    nodeBackgroundColorSet: IFreeplaneService_INodeBackgroundColorSet;
}

interface IFreeplaneService_ICreateChild extends grpc.MethodDefinition<freeplane_pb.CreateChildRequest, freeplane_pb.CreateChildResponse> {
    path: "/freeplane.Freeplane/CreateChild";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<freeplane_pb.CreateChildRequest>;
    requestDeserialize: grpc.deserialize<freeplane_pb.CreateChildRequest>;
    responseSerialize: grpc.serialize<freeplane_pb.CreateChildResponse>;
    responseDeserialize: grpc.deserialize<freeplane_pb.CreateChildResponse>;
}
interface IFreeplaneService_IDeleteChild extends grpc.MethodDefinition<freeplane_pb.DeleteChildRequest, freeplane_pb.DeleteChildResponse> {
    path: "/freeplane.Freeplane/DeleteChild";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<freeplane_pb.DeleteChildRequest>;
    requestDeserialize: grpc.deserialize<freeplane_pb.DeleteChildRequest>;
    responseSerialize: grpc.serialize<freeplane_pb.DeleteChildResponse>;
    responseDeserialize: grpc.deserialize<freeplane_pb.DeleteChildResponse>;
}
interface IFreeplaneService_INodeAttributeAdd extends grpc.MethodDefinition<freeplane_pb.NodeAttributeAddRequest, freeplane_pb.NodeAttributeAddResponse> {
    path: "/freeplane.Freeplane/NodeAttributeAdd";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<freeplane_pb.NodeAttributeAddRequest>;
    requestDeserialize: grpc.deserialize<freeplane_pb.NodeAttributeAddRequest>;
    responseSerialize: grpc.serialize<freeplane_pb.NodeAttributeAddResponse>;
    responseDeserialize: grpc.deserialize<freeplane_pb.NodeAttributeAddResponse>;
}
interface IFreeplaneService_INodeLinkSet extends grpc.MethodDefinition<freeplane_pb.NodeLinkSetRequest, freeplane_pb.NodeLinkSetResponse> {
    path: "/freeplane.Freeplane/NodeLinkSet";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<freeplane_pb.NodeLinkSetRequest>;
    requestDeserialize: grpc.deserialize<freeplane_pb.NodeLinkSetRequest>;
    responseSerialize: grpc.serialize<freeplane_pb.NodeLinkSetResponse>;
    responseDeserialize: grpc.deserialize<freeplane_pb.NodeLinkSetResponse>;
}
interface IFreeplaneService_INodeDetailsSet extends grpc.MethodDefinition<freeplane_pb.NodeDetailsSetRequest, freeplane_pb.NodeDetailsSetResponse> {
    path: "/freeplane.Freeplane/NodeDetailsSet";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<freeplane_pb.NodeDetailsSetRequest>;
    requestDeserialize: grpc.deserialize<freeplane_pb.NodeDetailsSetRequest>;
    responseSerialize: grpc.serialize<freeplane_pb.NodeDetailsSetResponse>;
    responseDeserialize: grpc.deserialize<freeplane_pb.NodeDetailsSetResponse>;
}
interface IFreeplaneService_IGroovy extends grpc.MethodDefinition<freeplane_pb.GroovyRequest, freeplane_pb.GroovyResponse> {
    path: "/freeplane.Freeplane/Groovy";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<freeplane_pb.GroovyRequest>;
    requestDeserialize: grpc.deserialize<freeplane_pb.GroovyRequest>;
    responseSerialize: grpc.serialize<freeplane_pb.GroovyResponse>;
    responseDeserialize: grpc.deserialize<freeplane_pb.GroovyResponse>;
}
interface IFreeplaneService_INodeColorSet extends grpc.MethodDefinition<freeplane_pb.NodeColorSetRequest, freeplane_pb.NodeColorSetResponse> {
    path: "/freeplane.Freeplane/NodeColorSet";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<freeplane_pb.NodeColorSetRequest>;
    requestDeserialize: grpc.deserialize<freeplane_pb.NodeColorSetRequest>;
    responseSerialize: grpc.serialize<freeplane_pb.NodeColorSetResponse>;
    responseDeserialize: grpc.deserialize<freeplane_pb.NodeColorSetResponse>;
}
interface IFreeplaneService_INodeBackgroundColorSet extends grpc.MethodDefinition<freeplane_pb.NodeBackgroundColorSetRequest, freeplane_pb.NodeBackgroundColorSetResponse> {
    path: "/freeplane.Freeplane/NodeBackgroundColorSet";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<freeplane_pb.NodeBackgroundColorSetRequest>;
    requestDeserialize: grpc.deserialize<freeplane_pb.NodeBackgroundColorSetRequest>;
    responseSerialize: grpc.serialize<freeplane_pb.NodeBackgroundColorSetResponse>;
    responseDeserialize: grpc.deserialize<freeplane_pb.NodeBackgroundColorSetResponse>;
}

export const FreeplaneService: IFreeplaneService;

export interface IFreeplaneServer {
    createChild: grpc.handleUnaryCall<freeplane_pb.CreateChildRequest, freeplane_pb.CreateChildResponse>;
    deleteChild: grpc.handleUnaryCall<freeplane_pb.DeleteChildRequest, freeplane_pb.DeleteChildResponse>;
    nodeAttributeAdd: grpc.handleUnaryCall<freeplane_pb.NodeAttributeAddRequest, freeplane_pb.NodeAttributeAddResponse>;
    nodeLinkSet: grpc.handleUnaryCall<freeplane_pb.NodeLinkSetRequest, freeplane_pb.NodeLinkSetResponse>;
    nodeDetailsSet: grpc.handleUnaryCall<freeplane_pb.NodeDetailsSetRequest, freeplane_pb.NodeDetailsSetResponse>;
    groovy: grpc.handleUnaryCall<freeplane_pb.GroovyRequest, freeplane_pb.GroovyResponse>;
    nodeColorSet: grpc.handleUnaryCall<freeplane_pb.NodeColorSetRequest, freeplane_pb.NodeColorSetResponse>;
    nodeBackgroundColorSet: grpc.handleUnaryCall<freeplane_pb.NodeBackgroundColorSetRequest, freeplane_pb.NodeBackgroundColorSetResponse>;
}

export interface IFreeplaneClient {
    createChild(request: freeplane_pb.CreateChildRequest, callback: (error: grpc.ServiceError | null, response: freeplane_pb.CreateChildResponse) => void): grpc.ClientUnaryCall;
    createChild(request: freeplane_pb.CreateChildRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: freeplane_pb.CreateChildResponse) => void): grpc.ClientUnaryCall;
    createChild(request: freeplane_pb.CreateChildRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: freeplane_pb.CreateChildResponse) => void): grpc.ClientUnaryCall;
    deleteChild(request: freeplane_pb.DeleteChildRequest, callback: (error: grpc.ServiceError | null, response: freeplane_pb.DeleteChildResponse) => void): grpc.ClientUnaryCall;
    deleteChild(request: freeplane_pb.DeleteChildRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: freeplane_pb.DeleteChildResponse) => void): grpc.ClientUnaryCall;
    deleteChild(request: freeplane_pb.DeleteChildRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: freeplane_pb.DeleteChildResponse) => void): grpc.ClientUnaryCall;
    nodeAttributeAdd(request: freeplane_pb.NodeAttributeAddRequest, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeAttributeAddResponse) => void): grpc.ClientUnaryCall;
    nodeAttributeAdd(request: freeplane_pb.NodeAttributeAddRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeAttributeAddResponse) => void): grpc.ClientUnaryCall;
    nodeAttributeAdd(request: freeplane_pb.NodeAttributeAddRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeAttributeAddResponse) => void): grpc.ClientUnaryCall;
    nodeLinkSet(request: freeplane_pb.NodeLinkSetRequest, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeLinkSetResponse) => void): grpc.ClientUnaryCall;
    nodeLinkSet(request: freeplane_pb.NodeLinkSetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeLinkSetResponse) => void): grpc.ClientUnaryCall;
    nodeLinkSet(request: freeplane_pb.NodeLinkSetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeLinkSetResponse) => void): grpc.ClientUnaryCall;
    nodeDetailsSet(request: freeplane_pb.NodeDetailsSetRequest, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeDetailsSetResponse) => void): grpc.ClientUnaryCall;
    nodeDetailsSet(request: freeplane_pb.NodeDetailsSetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeDetailsSetResponse) => void): grpc.ClientUnaryCall;
    nodeDetailsSet(request: freeplane_pb.NodeDetailsSetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeDetailsSetResponse) => void): grpc.ClientUnaryCall;
    groovy(request: freeplane_pb.GroovyRequest, callback: (error: grpc.ServiceError | null, response: freeplane_pb.GroovyResponse) => void): grpc.ClientUnaryCall;
    groovy(request: freeplane_pb.GroovyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: freeplane_pb.GroovyResponse) => void): grpc.ClientUnaryCall;
    groovy(request: freeplane_pb.GroovyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: freeplane_pb.GroovyResponse) => void): grpc.ClientUnaryCall;
    nodeColorSet(request: freeplane_pb.NodeColorSetRequest, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeColorSetResponse) => void): grpc.ClientUnaryCall;
    nodeColorSet(request: freeplane_pb.NodeColorSetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeColorSetResponse) => void): grpc.ClientUnaryCall;
    nodeColorSet(request: freeplane_pb.NodeColorSetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeColorSetResponse) => void): grpc.ClientUnaryCall;
    nodeBackgroundColorSet(request: freeplane_pb.NodeBackgroundColorSetRequest, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeBackgroundColorSetResponse) => void): grpc.ClientUnaryCall;
    nodeBackgroundColorSet(request: freeplane_pb.NodeBackgroundColorSetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeBackgroundColorSetResponse) => void): grpc.ClientUnaryCall;
    nodeBackgroundColorSet(request: freeplane_pb.NodeBackgroundColorSetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeBackgroundColorSetResponse) => void): grpc.ClientUnaryCall;
}

export class FreeplaneClient extends grpc.Client implements IFreeplaneClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public createChild(request: freeplane_pb.CreateChildRequest, callback: (error: grpc.ServiceError | null, response: freeplane_pb.CreateChildResponse) => void): grpc.ClientUnaryCall;
    public createChild(request: freeplane_pb.CreateChildRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: freeplane_pb.CreateChildResponse) => void): grpc.ClientUnaryCall;
    public createChild(request: freeplane_pb.CreateChildRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: freeplane_pb.CreateChildResponse) => void): grpc.ClientUnaryCall;
    public deleteChild(request: freeplane_pb.DeleteChildRequest, callback: (error: grpc.ServiceError | null, response: freeplane_pb.DeleteChildResponse) => void): grpc.ClientUnaryCall;
    public deleteChild(request: freeplane_pb.DeleteChildRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: freeplane_pb.DeleteChildResponse) => void): grpc.ClientUnaryCall;
    public deleteChild(request: freeplane_pb.DeleteChildRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: freeplane_pb.DeleteChildResponse) => void): grpc.ClientUnaryCall;
    public nodeAttributeAdd(request: freeplane_pb.NodeAttributeAddRequest, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeAttributeAddResponse) => void): grpc.ClientUnaryCall;
    public nodeAttributeAdd(request: freeplane_pb.NodeAttributeAddRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeAttributeAddResponse) => void): grpc.ClientUnaryCall;
    public nodeAttributeAdd(request: freeplane_pb.NodeAttributeAddRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeAttributeAddResponse) => void): grpc.ClientUnaryCall;
    public nodeLinkSet(request: freeplane_pb.NodeLinkSetRequest, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeLinkSetResponse) => void): grpc.ClientUnaryCall;
    public nodeLinkSet(request: freeplane_pb.NodeLinkSetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeLinkSetResponse) => void): grpc.ClientUnaryCall;
    public nodeLinkSet(request: freeplane_pb.NodeLinkSetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeLinkSetResponse) => void): grpc.ClientUnaryCall;
    public nodeDetailsSet(request: freeplane_pb.NodeDetailsSetRequest, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeDetailsSetResponse) => void): grpc.ClientUnaryCall;
    public nodeDetailsSet(request: freeplane_pb.NodeDetailsSetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeDetailsSetResponse) => void): grpc.ClientUnaryCall;
    public nodeDetailsSet(request: freeplane_pb.NodeDetailsSetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeDetailsSetResponse) => void): grpc.ClientUnaryCall;
    public groovy(request: freeplane_pb.GroovyRequest, callback: (error: grpc.ServiceError | null, response: freeplane_pb.GroovyResponse) => void): grpc.ClientUnaryCall;
    public groovy(request: freeplane_pb.GroovyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: freeplane_pb.GroovyResponse) => void): grpc.ClientUnaryCall;
    public groovy(request: freeplane_pb.GroovyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: freeplane_pb.GroovyResponse) => void): grpc.ClientUnaryCall;
    public nodeColorSet(request: freeplane_pb.NodeColorSetRequest, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeColorSetResponse) => void): grpc.ClientUnaryCall;
    public nodeColorSet(request: freeplane_pb.NodeColorSetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeColorSetResponse) => void): grpc.ClientUnaryCall;
    public nodeColorSet(request: freeplane_pb.NodeColorSetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeColorSetResponse) => void): grpc.ClientUnaryCall;
    public nodeBackgroundColorSet(request: freeplane_pb.NodeBackgroundColorSetRequest, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeBackgroundColorSetResponse) => void): grpc.ClientUnaryCall;
    public nodeBackgroundColorSet(request: freeplane_pb.NodeBackgroundColorSetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeBackgroundColorSetResponse) => void): grpc.ClientUnaryCall;
    public nodeBackgroundColorSet(request: freeplane_pb.NodeBackgroundColorSetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: freeplane_pb.NodeBackgroundColorSetResponse) => void): grpc.ClientUnaryCall;
}
