import { DynamicServiceClient, DynamicServiceClientParams } from '../dynamicServiceClient/JSONRPC11';

// Metrics client --
// TODO: move
// TODO: use a more dynamic dynamic service client??

interface MetricsServiceParams extends DynamicServiceClientParams { }


export interface JobState {
    app_id: string;
    client_groups: Array<string>;
    user?: string;

    complete: boolean;
    error: boolean;
    status: string;
    state: string;

    creation_time: number;
    exec_start_time?: number;
    modification_time?: number;
    finish_time?: number;

    job_id: string;
    method: string;

    wsid: string;
    narrative_objNo: number;

    narrative_name: string;
    workspace_name: string;
}


interface GetAppMetricsParams {
    epoch_range: [number, number];
    user_ids: Array<string>;
}
interface GetAppMetricsResult {
    job_states: Array<JobState>;
}

interface GetJobsParams {
    epoch_range: [number, number];
    user_ids: Array<string>;
}
interface GetJobsResult {
    job_states: Array<JobState>;
    total_count: number;
}

interface GetJobParams {
    job_id: string;
}
interface GetJobResult {
    job_state: JobState;
}

// Query Jobs
/*
/* Query jobs */
/*
typedef structure {
    JobID job_id;

    string app_id;
    string method; 
    string app_tag;

    int workspace_id;
    int object_id;
    int object_version;

    string user;

    string status;
    bool complete;
    bool error;
    int creation_time;
    int exec_start_time;
    int finish_time;
    int modification_time;

    list<string> client_groups;
} JobStateMinimal;

typedef structure {
    string field;
    string direction;
} SortSpec;

typedef structure {
    string term;
    string type;
} SearchSpec;

typedef structure {
    list<string> job_id;
    list<user_id> user_id;
    list<string> status;
    list<int> workspace;
    list<string> app; 
} FilterSpec;

typedef structure {
    list<FilterSpec> filter;
    epoch_range epoch_range;
    list<SortSpec> sort;
    list<SearchSpec> search;
    int offset;
    int limit;
} QueryJobsParams;

typedef structure {
    list<JobStateMinimal> job_states;
    int total_count;
} QueryJobsResult;

funcdef query_jobs(QueryJobsParams params)
    returns (QueryJobsResult result) authentication required;
*/

export interface FilterSpec {
    job_id?: Array<string>;
    user_id?: Array<string>;
    status?: Array<number>;
    workspace?: Array<number>;
    app?: Array<string>;
}

export type EpochRange = [number, number];

export interface SortSpec {
    field: string;
    direction: string;
}

export interface SearchSpec {
    term: string;
    type: string;
}

export interface QueryJobsParams {
    // required
    epoch_range: EpochRange;
    sort: Array<SortSpec>;
    offset: number;
    limit: number;
    // optional
    search?: Array<SearchSpec>;
    filter?: Array<FilterSpec>;
}

export interface JobStateMinimal {
    job_id: string;
    app_id: string;
    method: string;
    app_tag: string;
    workspace_id: number;
    object_id: number;
    object_version: number;
    user: string;
    status: string;
    complete: boolean;
    error: boolean;
    creation_time: number;
    exec_start_time: number;
    finish_time: number;
    modification_time: number;
    client_groups: Array<string>;
}

export interface QueryJobsResult {
    job_states: Array<JobStateMinimal>;
    total_count: number;
}

export default class MetricsServiceClient extends DynamicServiceClient {
    module: string = 'kb_Metrics';

    async getJobs({ epoch_range, user_ids }: GetJobsParams): Promise<GetJobsResult> {
        return this.callFunc<GetJobsParams, GetJobsResult>('get_jobs', {
            epoch_range,
            user_ids
        });
    }

    async getJob({ job_id }: GetJobParams): Promise<GetJobResult> {
        return this.callFunc<GetJobParams, GetJobResult>('get_job', {
            job_id
        }
        );
    }

    async getAppMetrics({ epoch_range, user_ids }: GetAppMetricsParams): Promise<GetAppMetricsResult> {
        return await this.callFunc<GetAppMetricsParams, GetAppMetricsResult>('get_job', {
            epoch_range,
            user_ids
        });
    }

    async queryJobs(params: QueryJobsParams): Promise<QueryJobsResult> {
        return await this.callFunc<QueryJobsParams, QueryJobsResult>('query_jobs', params);
    }
}
