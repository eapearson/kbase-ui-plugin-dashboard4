import {
    HTTPClient, GeneralError,
    RequestOptions, HTTPHeader
} from './HTTPClient';

import { v4 as uuid } from 'uuid';
import { JSONValue, JSONObject, JSONArray } from '../json';

// Core JSON RPC 2.0

// The JSON RPC Request parameters
// An array of  JSON objects
// export interface JSONRPCParam {
//     [key: string]: any;
// }

// The top level JSON RPC request object

export type JSONRPCRequestParams = JSONArray | JSONObject;

export interface JSONRPCRequest {
    jsonrpc: '2.0';
    method: string;
    id: string | number | null;
    params: JSONRPCRequestParams;
}

export interface JSONRPCError {
    code: number;
    message: string;
    data?: JSONValue;
}

export interface JSONRPCResponseBase {
    jsonrpc: '2.0';
}

export interface JSONRPCResponseResult extends JSONRPCResponseBase {
    result: JSONValue;
}

export interface JSONRPCResponseError extends JSONRPCResponseBase {
    error: JSONRPCError;
}

export type JSONRPCResponse = JSONRPCResponseResult | JSONRPCResponseError;

// RPC Client

// export interface JSONRPCRequestOptions {
//     func: string;
//     params: any;
//     timeout?: number;
//     authorization?: string;
// }

export class JSONRPCException extends Error {
    error: JSONRPCError;
    constructor(error: JSONRPCError) {
        super(error.message);
        this.error = error;
    }
}
export interface JSONRPCClientParams {
    url: string,
    timeout: number;
    authorization?: string;
}

export class JSONRPCClient {
    url: string;
    timeout: number;
    authorization?: string;
    constructor({ url, timeout, authorization }: JSONRPCClientParams) {
        this.url = url;
        this.timeout = timeout;
        this.authorization = authorization;
    }

    isGeneralError(error: GeneralError) {
        return (error instanceof GeneralError);
    }


    protected makeRequest(method: string, params: JSONRPCRequestParams): JSONRPCRequest {
        return {
            jsonrpc: '2.0',
            method,
            id: uuid(),
            params: params
        };
    }

    async callMethod(method: string, params: JSONRPCRequestParams, { timeout }: { timeout?: number; } = {}): Promise<JSONValue> {
        const payload = this.makeRequest(method, params);
        const header: HTTPHeader = new HTTPHeader();
        header.setHeader('content-type', 'application/json');
        header.setHeader('accept', 'application/json');
        if (this.authorization) {
            header.setHeader('authorization', this.authorization);
        }

        const requestOptions: RequestOptions = {
            method: 'POST',
            url: this.url,
            timeout: timeout || this.timeout,
            data: JSON.stringify(payload),
            header: header
        };

        const httpClient = new HTTPClient();
        const httpResponse = await httpClient.request(requestOptions);

        let result: JSONRPCResponse;
        try {
            // TODO: validate the structure.
            result = (JSON.parse(httpResponse.response) as unknown) as JSONRPCResponse;
        } catch (ex) {
            throw new JSONRPCException({
                code: 100,
                message: 'The response from the service could not be parsed',
                data: {
                    originalMessage: ex.message,
                    responseText: httpResponse.response
                }
            });
        }


        if (result.hasOwnProperty('error')) {
            const errorResult = (result as unknown) as JSONRPCResponseError;
            throw new JSONRPCException({
                code: errorResult.error.code,
                message: errorResult.error.message,
                data: errorResult.error.data
            });
        }

        const rpcResponse = (result as unknown) as JSONRPCResponseResult;
        return rpcResponse.result;
    }
}