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