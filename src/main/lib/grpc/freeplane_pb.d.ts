// package: freeplane
// file: freeplane.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class CreateChildRequest extends jspb.Message { 
    getName(): string;
    setName(value: string): CreateChildRequest;
    getParentNodeId(): string;
    setParentNodeId(value: string): CreateChildRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateChildRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateChildRequest): CreateChildRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateChildRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateChildRequest;
    static deserializeBinaryFromReader(message: CreateChildRequest, reader: jspb.BinaryReader): CreateChildRequest;
}

export namespace CreateChildRequest {
    export type AsObject = {
        name: string,
        parentNodeId: string,
    }
}

export class CreateChildResponse extends jspb.Message { 
    getNodeId(): string;
    setNodeId(value: string): CreateChildResponse;
    getNodeText(): string;
    setNodeText(value: string): CreateChildResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateChildResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateChildResponse): CreateChildResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateChildResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateChildResponse;
    static deserializeBinaryFromReader(message: CreateChildResponse, reader: jspb.BinaryReader): CreateChildResponse;
}

export namespace CreateChildResponse {
    export type AsObject = {
        nodeId: string,
        nodeText: string,
    }
}

export class DeleteChildRequest extends jspb.Message { 
    getNodeId(): string;
    setNodeId(value: string): DeleteChildRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteChildRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteChildRequest): DeleteChildRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteChildRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteChildRequest;
    static deserializeBinaryFromReader(message: DeleteChildRequest, reader: jspb.BinaryReader): DeleteChildRequest;
}

export namespace DeleteChildRequest {
    export type AsObject = {
        nodeId: string,
    }
}

export class DeleteChildResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): DeleteChildResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteChildResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteChildResponse): DeleteChildResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteChildResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteChildResponse;
    static deserializeBinaryFromReader(message: DeleteChildResponse, reader: jspb.BinaryReader): DeleteChildResponse;
}

export namespace DeleteChildResponse {
    export type AsObject = {
        success: boolean,
    }
}

export class NodeAttributeAddRequest extends jspb.Message { 
    getNodeId(): string;
    setNodeId(value: string): NodeAttributeAddRequest;
    getAttributeName(): string;
    setAttributeName(value: string): NodeAttributeAddRequest;
    getAttributeValue(): string;
    setAttributeValue(value: string): NodeAttributeAddRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NodeAttributeAddRequest.AsObject;
    static toObject(includeInstance: boolean, msg: NodeAttributeAddRequest): NodeAttributeAddRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NodeAttributeAddRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NodeAttributeAddRequest;
    static deserializeBinaryFromReader(message: NodeAttributeAddRequest, reader: jspb.BinaryReader): NodeAttributeAddRequest;
}

export namespace NodeAttributeAddRequest {
    export type AsObject = {
        nodeId: string,
        attributeName: string,
        attributeValue: string,
    }
}

export class NodeAttributeAddResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): NodeAttributeAddResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NodeAttributeAddResponse.AsObject;
    static toObject(includeInstance: boolean, msg: NodeAttributeAddResponse): NodeAttributeAddResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NodeAttributeAddResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NodeAttributeAddResponse;
    static deserializeBinaryFromReader(message: NodeAttributeAddResponse, reader: jspb.BinaryReader): NodeAttributeAddResponse;
}

export namespace NodeAttributeAddResponse {
    export type AsObject = {
        success: boolean,
    }
}

export class NodeLinkSetRequest extends jspb.Message { 
    getNodeId(): string;
    setNodeId(value: string): NodeLinkSetRequest;
    getLink(): string;
    setLink(value: string): NodeLinkSetRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NodeLinkSetRequest.AsObject;
    static toObject(includeInstance: boolean, msg: NodeLinkSetRequest): NodeLinkSetRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NodeLinkSetRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NodeLinkSetRequest;
    static deserializeBinaryFromReader(message: NodeLinkSetRequest, reader: jspb.BinaryReader): NodeLinkSetRequest;
}

export namespace NodeLinkSetRequest {
    export type AsObject = {
        nodeId: string,
        link: string,
    }
}

export class NodeLinkSetResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): NodeLinkSetResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NodeLinkSetResponse.AsObject;
    static toObject(includeInstance: boolean, msg: NodeLinkSetResponse): NodeLinkSetResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NodeLinkSetResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NodeLinkSetResponse;
    static deserializeBinaryFromReader(message: NodeLinkSetResponse, reader: jspb.BinaryReader): NodeLinkSetResponse;
}

export namespace NodeLinkSetResponse {
    export type AsObject = {
        success: boolean,
    }
}

export class NodeDetailsSetRequest extends jspb.Message { 
    getNodeId(): string;
    setNodeId(value: string): NodeDetailsSetRequest;
    getDetails(): string;
    setDetails(value: string): NodeDetailsSetRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NodeDetailsSetRequest.AsObject;
    static toObject(includeInstance: boolean, msg: NodeDetailsSetRequest): NodeDetailsSetRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NodeDetailsSetRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NodeDetailsSetRequest;
    static deserializeBinaryFromReader(message: NodeDetailsSetRequest, reader: jspb.BinaryReader): NodeDetailsSetRequest;
}

export namespace NodeDetailsSetRequest {
    export type AsObject = {
        nodeId: string,
        details: string,
    }
}

export class NodeDetailsSetResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): NodeDetailsSetResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NodeDetailsSetResponse.AsObject;
    static toObject(includeInstance: boolean, msg: NodeDetailsSetResponse): NodeDetailsSetResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NodeDetailsSetResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NodeDetailsSetResponse;
    static deserializeBinaryFromReader(message: NodeDetailsSetResponse, reader: jspb.BinaryReader): NodeDetailsSetResponse;
}

export namespace NodeDetailsSetResponse {
    export type AsObject = {
        success: boolean,
    }
}

export class GroovyRequest extends jspb.Message { 
    getGroovyCode(): string;
    setGroovyCode(value: string): GroovyRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GroovyRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GroovyRequest): GroovyRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GroovyRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GroovyRequest;
    static deserializeBinaryFromReader(message: GroovyRequest, reader: jspb.BinaryReader): GroovyRequest;
}

export namespace GroovyRequest {
    export type AsObject = {
        groovyCode: string,
    }
}

export class GroovyResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): GroovyResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GroovyResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GroovyResponse): GroovyResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GroovyResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GroovyResponse;
    static deserializeBinaryFromReader(message: GroovyResponse, reader: jspb.BinaryReader): GroovyResponse;
}

export namespace GroovyResponse {
    export type AsObject = {
        success: boolean,
    }
}

export class NodeColorSetRequest extends jspb.Message { 
    getNodeId(): string;
    setNodeId(value: string): NodeColorSetRequest;
    getRed(): number;
    setRed(value: number): NodeColorSetRequest;
    getGreen(): number;
    setGreen(value: number): NodeColorSetRequest;
    getBlue(): number;
    setBlue(value: number): NodeColorSetRequest;
    getAlpha(): number;
    setAlpha(value: number): NodeColorSetRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NodeColorSetRequest.AsObject;
    static toObject(includeInstance: boolean, msg: NodeColorSetRequest): NodeColorSetRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NodeColorSetRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NodeColorSetRequest;
    static deserializeBinaryFromReader(message: NodeColorSetRequest, reader: jspb.BinaryReader): NodeColorSetRequest;
}

export namespace NodeColorSetRequest {
    export type AsObject = {
        nodeId: string,
        red: number,
        green: number,
        blue: number,
        alpha: number,
    }
}

export class NodeColorSetResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): NodeColorSetResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NodeColorSetResponse.AsObject;
    static toObject(includeInstance: boolean, msg: NodeColorSetResponse): NodeColorSetResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NodeColorSetResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NodeColorSetResponse;
    static deserializeBinaryFromReader(message: NodeColorSetResponse, reader: jspb.BinaryReader): NodeColorSetResponse;
}

export namespace NodeColorSetResponse {
    export type AsObject = {
        success: boolean,
    }
}

export class NodeBackgroundColorSetRequest extends jspb.Message { 
    getNodeId(): string;
    setNodeId(value: string): NodeBackgroundColorSetRequest;
    getRed(): number;
    setRed(value: number): NodeBackgroundColorSetRequest;
    getGreen(): number;
    setGreen(value: number): NodeBackgroundColorSetRequest;
    getBlue(): number;
    setBlue(value: number): NodeBackgroundColorSetRequest;
    getAlpha(): number;
    setAlpha(value: number): NodeBackgroundColorSetRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NodeBackgroundColorSetRequest.AsObject;
    static toObject(includeInstance: boolean, msg: NodeBackgroundColorSetRequest): NodeBackgroundColorSetRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NodeBackgroundColorSetRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NodeBackgroundColorSetRequest;
    static deserializeBinaryFromReader(message: NodeBackgroundColorSetRequest, reader: jspb.BinaryReader): NodeBackgroundColorSetRequest;
}

export namespace NodeBackgroundColorSetRequest {
    export type AsObject = {
        nodeId: string,
        red: number,
        green: number,
        blue: number,
        alpha: number,
    }
}

export class NodeBackgroundColorSetResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): NodeBackgroundColorSetResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NodeBackgroundColorSetResponse.AsObject;
    static toObject(includeInstance: boolean, msg: NodeBackgroundColorSetResponse): NodeBackgroundColorSetResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NodeBackgroundColorSetResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NodeBackgroundColorSetResponse;
    static deserializeBinaryFromReader(message: NodeBackgroundColorSetResponse, reader: jspb.BinaryReader): NodeBackgroundColorSetResponse;
}

export namespace NodeBackgroundColorSetResponse {
    export type AsObject = {
        success: boolean,
    }
}
