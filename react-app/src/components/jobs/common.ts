import { JobState } from "../../lib/comm/dynamicServices/MetricsServiceClient";

export enum AsyncProcessStatus {
    NONE,
    BUSY,
    COMPLETE,
    ERROR
}

export interface AsyncProcessBase {
    status: AsyncProcessStatus;
}

export interface AsyncProcessNone {
    status: AsyncProcessStatus.NONE;
}

export interface AsyncProcessBusy {
    status: AsyncProcessStatus.BUSY;
}

export interface AsyncProcessComplete<T> {
    status: AsyncProcessStatus.COMPLETE;
    value: T;
}

export interface AsyncProcessError<E> {
    status: AsyncProcessStatus.ERROR;
    error: E;
}

export type AsyncProcess<T, E> =
    AsyncProcessNone |
    AsyncProcessBusy |
    AsyncProcessComplete<T> |
    AsyncProcessError<E>;



export enum JobStatus {
    QUEUED = "QUEUED",
    RUNNING = "RUNNING",
    FINISHED = "FINISHED",
    ERRORED_QUEUED = "ERRORED_QUEUED",
    ERRORED_RUNNING = "ERRORED_RUNNING",
    CANCELED_QUEUED = "CANCELED_QUEUED",
    CANCELED_RUNNING = "CANCELED_RUNNING"
}

function getJobStatus(job: JobState): JobStatus {
    switch (job.state) {
        case 'QUEUED': return JobStatus.QUEUED;
        case 'RUNNING': return JobStatus.RUNNING;
        case 'FINISHED': return JobStatus.FINISHED;
        case 'CANCELED_QUEUED': return JobStatus.CANCELED_QUEUED;
        case 'CANCELED_RUNNING': return JobStatus.CANCELED_QUEUED;

        // case 'ERRORED': return JobStatus.ERRORED;
        case 'ERRORED_QUEUED':
            // console.warn('QUEUE_ERRORED', job);
            return JobStatus.ERRORED_QUEUED;
        case 'ERRORED_RUNNING':
            return JobStatus.ERRORED_RUNNING;
        default:
            throw new Error('Unknown job state: ' + job.state);
    }

}

export type JobID = string;

export type EpochTime = number;

export interface JobQueued {
    status: JobStatus.QUEUED;
    id: JobID;
    key: string;
    narrativeID: number | null;
    narrativeTitle: string;
    appID: string;
    appTitle: string;
    queuedAt: EpochTime;
    queuedElapsed: number;
    clientGroups: Array<string>;
    username: string;
}

export interface JobRunning {
    status: JobStatus.RUNNING;
    id: JobID;
    key: string;
    narrativeID: number | null;
    narrativeTitle: string;
    appID: string;
    appTitle: string;
    queuedAt: EpochTime;
    runAt: EpochTime;
    queuedElapsed: number;
    runElapsed: number;
    clientGroups: Array<string>;
    username: string;
}

export interface JobFinished {
    status: JobStatus.FINISHED;
    id: JobID;
    key: string;
    narrativeID: number | null;
    narrativeTitle: string;
    appID: string;
    appTitle: string;
    queuedAt: EpochTime;
    runAt: EpochTime;
    finishAt: EpochTime;
    queuedElapsed: number;
    runElapsed: number;
    clientGroups: Array<string>;
    username: string;
}

export interface JobCanceledWhileQueued {
    status: JobStatus.CANCELED_QUEUED;
    id: JobID;
    key: string;
    narrativeID: number | null;
    narrativeTitle: string;
    appID: string;
    appTitle: string;
    queuedAt: EpochTime;
    finishAt: EpochTime;
    queuedElapsed: number;
    clientGroups: Array<string>;
    username: string;
}

export interface JobCanceledWhileRunning {
    status: JobStatus.CANCELED_RUNNING;
    id: JobID;
    key: string;
    narrativeID: number | null;
    narrativeTitle: string;
    appID: string;
    appTitle: string;
    queuedAt: EpochTime;
    runAt: EpochTime;
    finishAt: EpochTime;
    queuedElapsed: number;
    runElapsed: number;
    clientGroups: Array<string>;
    username: string;
}

export interface JobErroredWhileQueued {
    status: JobStatus.ERRORED_QUEUED;
    id: JobID;
    key: string;
    narrativeID: number | null;
    narrativeTitle: string;
    appID: string;
    appTitle: string;
    queuedAt: EpochTime;
    finishAt: EpochTime;
    queuedElapsed: number;
    message: string;
    clientGroups: Array<string>;
    username: string;
}

export interface JobErroredWhileRunning {
    status: JobStatus.ERRORED_RUNNING;
    id: JobID;
    key: string;
    narrativeID: number | null;
    narrativeTitle: string;
    appID: string;
    appTitle: string;
    queuedAt: EpochTime;
    runAt: EpochTime;
    finishAt: EpochTime;
    queuedElapsed: number;
    runElapsed: number;
    message: string;
    clientGroups: Array<string>;
    username: string;
}

export type Job =
    | JobQueued
    | JobRunning
    | JobFinished
    | JobCanceledWhileQueued
    | JobCanceledWhileRunning
    | JobErroredWhileQueued
    | JobErroredWhileRunning;

function makeJobQueued(job: JobState, username: string): JobQueued {
    let narrativeID;
    if (job.wsid) {
        narrativeID = parseInt(job.wsid, 10);
    } else {
        narrativeID = null;
    }
    return {
        key: job.job_id,
        id: job.job_id,
        status: JobStatus.QUEUED,
        appID: job.app_id,
        appTitle: job.app_id,
        narrativeID,
        narrativeTitle: job.narrative_name,
        queuedAt: job.creation_time,
        // runAt: job.exec_start_time! || null,
        queuedElapsed: Date.now() - job.creation_time,
        clientGroups: job.client_groups,
        // TODO: a more affirmative method of providing current username
        // for querying for own...?
        username: job.user || username
    };
}

function makeJobRunning(job: JobState, username: string): JobRunning {
    let narrativeID;
    if (job.wsid) {
        narrativeID = parseInt(job.wsid, 10);
    } else {
        narrativeID = null;
    }
    if (!job.exec_start_time) {
        console.error('ERROR: Running job without exec_start_time!', job);
        throw new Error('Running job without exec_start_time!');
    }
    return {
        key: job.job_id,
        id: job.job_id,
        status: JobStatus.RUNNING,
        appID: job.app_id,
        appTitle: job.app_id,
        narrativeID,
        narrativeTitle: job.narrative_name,
        queuedAt: job.creation_time,
        runAt: job.exec_start_time,
        runElapsed: Date.now() - job.exec_start_time,
        queuedElapsed: Date.now() - job.creation_time,
        clientGroups: job.client_groups,
        // TODO: a more affirmative method of providing current username
        // for querying for own...?
        username: job.user || username
    };
}

function makeJobFinished(job: JobState, username: string): JobFinished {
    let narrativeID;
    if (job.wsid) {
        narrativeID = parseInt(job.wsid, 10);
    } else {
        narrativeID = null;
    }
    if (!job.exec_start_time) {
        throw new Error('Running job without exec_start_time!');
    }
    if (!job.finish_time) {
        throw new Error('Running job without finish_time!');
    }
    return {
        key: job.job_id,
        id: job.job_id,
        status: JobStatus.FINISHED,
        appID: job.app_id,
        appTitle: job.app_id,
        narrativeID,
        narrativeTitle: job.narrative_name,
        queuedAt: job.creation_time,
        runAt: job.exec_start_time,
        runElapsed: job.finish_time - job.exec_start_time,
        finishAt: job.finish_time,
        queuedElapsed: Date.now() - job.creation_time,
        clientGroups: job.client_groups,
        // TODO: a more affirmative method of providing current username
        // for querying for own...?
        username: job.user || username
    };
}

function makeJobCanceledQueued(job: JobState, username: string): JobCanceledWhileQueued {
    let narrativeID;
    if (job.wsid) {
        narrativeID = parseInt(job.wsid, 10);
    } else {
        narrativeID = null;
    }

    if (!job.finish_time) {
        throw new Error('Canceled job without finish_time!');
    }
    return {
        key: job.job_id,
        id: job.job_id,
        status: JobStatus.CANCELED_QUEUED,
        appID: job.app_id,
        appTitle: job.app_id,
        narrativeID,
        narrativeTitle: job.narrative_name,
        queuedAt: job.creation_time,
        queuedElapsed: Date.now() - job.creation_time,
        clientGroups: job.client_groups,
        finishAt: job.finish_time,
        // TODO: a more affirmative method of providing current username
        // for querying for own...?
        username: job.user || username
    };
}

function makeJobCanceledRunning(job: JobState, username: string): JobCanceledWhileRunning {
    let narrativeID;
    if (job.wsid) {
        narrativeID = parseInt(job.wsid, 10);
    } else {
        narrativeID = null;
    }
    if (!job.exec_start_time) {
        throw new Error('Canceled job without exec_start_time!');
    }
    if (!job.finish_time) {
        throw new Error('Canceled job without finish_time!');
    }
    return {
        key: job.job_id,
        id: job.job_id,
        status: JobStatus.CANCELED_RUNNING,
        appID: job.app_id,
        appTitle: job.app_id,
        narrativeID,
        narrativeTitle: job.narrative_name,
        queuedAt: job.creation_time,
        runAt: job.exec_start_time,
        runElapsed: job.finish_time - job.exec_start_time,
        finishAt: job.finish_time,
        queuedElapsed: Date.now() - job.creation_time,
        clientGroups: job.client_groups,
        // TODO: a more affirmative method of providing current username
        // for querying for own...?
        username: job.user || username
    };
}

function makeJobErroredQueued(job: JobState, username: string): JobErroredWhileQueued {
    let narrativeID;
    if (job.wsid) {
        narrativeID = parseInt(job.wsid, 10);
    } else {
        narrativeID = null;
    }
    if (!job.finish_time) {
        throw new Error('Errored job without finish_time!');
    }
    return {
        key: job.job_id,
        id: job.job_id,
        status: JobStatus.ERRORED_QUEUED,
        appID: job.app_id,
        appTitle: job.app_id,
        narrativeID,
        narrativeTitle: job.narrative_name,
        queuedAt: job.creation_time,
        finishAt: job.finish_time,
        queuedElapsed: job.finish_time - job.creation_time,
        clientGroups: job.client_groups,
        message: job.status,
        // TODO: a more affirmative method of providing current username
        // for querying for own...?
        username: job.user || username
    };
}

function makeJobErroredRunning(job: JobState, username: string): JobErroredWhileRunning {
    let narrativeID;
    if (job.wsid) {
        narrativeID = parseInt(job.wsid, 10);
    } else {
        narrativeID = null;
    }
    if (!job.exec_start_time) {
        console.error('ERROR: Errored job without exec_start_time!', job);
        throw new Error('Errored job without exec_start_time!');
    }
    if (!job.finish_time) {
        throw new Error('Errored job without finish_time!');
    }
    return {
        key: job.job_id,
        id: job.job_id,
        status: JobStatus.ERRORED_RUNNING,
        appID: job.app_id,
        appTitle: job.app_id,
        narrativeID,
        narrativeTitle: job.narrative_name,
        queuedAt: job.creation_time,
        runAt: job.exec_start_time,
        runElapsed: job.finish_time - job.exec_start_time,
        finishAt: job.finish_time,
        queuedElapsed: job.exec_start_time - job.creation_time,
        clientGroups: job.client_groups,
        message: job.status,
        // TODO: a more affirmative method of providing current username
        // for querying for own...?
        username: job.user || username
    };
}

export function serviceJobToUIJob(job: JobState, username: string): Job {
    const status = getJobStatus(job);
    switch (status) {
        case JobStatus.QUEUED:
            return makeJobQueued(job, username);
        case JobStatus.RUNNING:
            return makeJobRunning(job, username);
        case JobStatus.FINISHED:
            return makeJobFinished(job, username);
        case JobStatus.ERRORED_QUEUED:
            return makeJobErroredQueued(job, username);
        case JobStatus.ERRORED_RUNNING:
            return makeJobErroredRunning(job, username);
        case JobStatus.CANCELED_QUEUED:
            return makeJobCanceledQueued(job, username);
        case JobStatus.CANCELED_RUNNING:
            return makeJobCanceledRunning(job, username);
        default:
            throw new Error('Invalid job status: ' + job.status);
    }
}