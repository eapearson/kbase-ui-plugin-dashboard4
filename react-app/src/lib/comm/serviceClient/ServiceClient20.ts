import { JSONRPCClient } from '../JSONRPC20';
import { JSONValue, JSONArray, JSONObject } from '../../json';
import { ServiceClientParams } from './common';

export type ResultTransformer<T> = (value: JSONValue) => T;

export type ParamTransformer<T> = (param: T) => JSONObject | JSONArray;

export abstract class ServiceClient {
    abstract module: string | null;
    url: string;
    timeout: number;
    authorization?: string;

    constructor({ url, timeout, authorization }: ServiceClientParams) {
        this.url = url;
        this.timeout = timeout;
        this.authorization = authorization;
    }

    async callFunc<ParamType, ReturnType>(
        funcName: string,
        params: ParamType,
        paramTransformer: ParamTransformer<ParamType>,
        resultTransformer: ResultTransformer<ReturnType>
    ): Promise<ReturnType> {
        const client = new JSONRPCClient({
            url: this.url,
            timeout: this.timeout,
            authorization: this.authorization
        });
        const method = this.module ? `${this.module}.${funcName}` : funcName;
        const result = await client.callMethod(method, paramTransformer(params), {
            timeout: this.timeout
        });

        return resultTransformer(result);

    }
}