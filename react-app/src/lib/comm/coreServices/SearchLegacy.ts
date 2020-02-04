import { ServiceClient } from '../ServiceClient11';

export interface MatchValue {
    value?: string;
    int_value?: number;
    double_value?: number;
    bool_value?: boolean;
    min_int?: number;
    max_int?: number;
    min_date?: number;
    max_date?: number;
    min_double?: number;
    max_double?: number;
}

export interface KeyValue {
    [x: string]: MatchValue;
}

export interface MapStringOf<V> {
    [x: string]: V;
}

export interface MapNumberOf<V> {
    [x: number]: V;
}

export interface MatchFilter {
    full_text_in_all?: string;
    object_name?: string;
    timestamp?: MatchValue;
    exclude_subobjects?: boolean;
    lookup_in_keys?: KeyValue;
    source_tags?: Array<string>;
    source_tags_blacklist?: boolean;
}

export interface SortingRule {
    property: string;
    is_object_property?: boolean;
    ascending?: boolean;
}

export interface AccessFilter {
    with_private?: boolean;
    with_public?: boolean;
    with_all_history?: boolean;
}

export interface Pagination {
    start: number;
    count: number;
}

export interface PostProcessing {
    ids_only: boolean;
    skip_keys: boolean;
    skip_data: boolean;
    include_highlight: boolean;
    add_narrative_info: boolean;
    add_access_group_info: boolean;
}

export interface SearchObjectsParam {
    object_type: Array<string>;
    match_filter: MatchFilter;
    sorting_rules?: Array<SortingRule>;
    access_filter: AccessFilter;
    pagination?: Pagination;
    post_processing?: PostProcessing;
}

export type access_group_id = number;
export type object_ref = string;

// narrative_name, narrative_id, time_last_saved, ws_owner_username, ws_owner_displaynamne
export type narrative_info = [string, number, number, string, string];

/*
typedef tuple<ws_id id, ws_name workspace, username owner, timestamp moddate,
		int max_objid, permission user_permission, permission globalread,
		lock_status lockstat, usermeta metadata> workspace_info;
		
*/
export type workspace_info = [number, string, string, number, number, string, string, string, MapStringOf<string>];

/*
typedef tuple<obj_id objid, obj_name name, type_string type,
		timestamp save_date, int version, username saved_by,
		ws_id wsid, ws_name workspace, string chsum, int size, usermeta meta>
		object_info;
	
*/
export type object_info = [number, string, string, number, number, string, number, string, string, number, MapStringOf<string>];
export type access_group_info = workspace_info;

export interface ObjectData {
    guid: string;
    parent_guid: string;
    object_name: string;
    timestamp: number;
    type: string;
    type_ver: number;
    creator: string;
    copier: string;
    mod: string;
    method: string;
    module_ver: string;
    commit: string;

    parent_data: any;
    data: any;
    key_props: MapStringOf<string>;
    highlight: MapStringOf<Array<string>>;
}

export interface SearchObjectsResult {
    pagination?: Pagination;
    sorting_rules?: Array<SortingRule>;
    objects: Array<ObjectData>;
    total: number;
    search_time: number;
    access_group_narrative_info: MapNumberOf<narrative_info>;
    access_groups_info: XMLDocument;
    objects_info: XMLDocument;
}

export default class SearchClient extends ServiceClient {
    module: string = 'KBaseSearchEngine';

    async searchObjects(param: SearchObjectsParam): Promise<SearchObjectsResult> {
        return await this.callFunc<SearchObjectsParam, SearchObjectsResult>('search_objects', param);
    }
}