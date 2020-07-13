import { EpochRange } from "../../lib/comm/dynamicServices/MetricsServiceClient";

export type SortField = 'createdAt' | 'savedAt' | 'title';

export type SortDirection = 'ascending' | 'descending';

export interface SortOrder {
    field: SortField;
    direction: SortDirection;
}

export enum Ownership {
    OWN,
    SHARED,
    PUBLIC
}

export interface NarrativesConfigProps {
    isPublic?: boolean;
    isPrivate?: boolean;
    timeRange?: EpochRange;
    sortOrder?: SortOrder;
    isNarratorial?: boolean;
    isOwn?: boolean;
    isSharedWith?: boolean;
    isSharedBy?: boolean;
}
