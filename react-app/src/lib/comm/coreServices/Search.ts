import { ServiceClient } from '../serviceClient/ServiceClient20';
import { JSONValue, JSONObject, JSONArray } from '../../json';

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

export interface MatchAll {

}

export type SearchQuery = {
    // match_all?: MatchAll;
    // simple_query_string?: {
    //     query: string;
    //     analyzer: string;
    //     fields: Array<string>;
    //     default_operator: string;
    // };
};



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
    owner: string;
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

export type SearchObjectsParam = {
    query: any;
    // source?: any;
    indexes: Array<string>;
    only_public?: boolean;
    only_private?: boolean;
    size: number;
    from: number;
    sort: any;
};

export type User = string;

export type SearchTag = 'narrative' | 'refdata';

export type SearchDocument = {
    access_group: number;
    obj_name: string;
    shared_users: Array<User>;
    timestamp: number;
    creation_date: string;
    is_public: boolean;
    version: number;
    obj_id: number;
    copied: boolean | null;
    tags: Array<SearchTag>;
    obj_type_version: string;
    obj_type_module: string;
    obj_type_name: string;
};

export type NarrativeDataObject = {

};

export type NarrativeCell = {
    desc: string;
    cell_type: string;
};

export interface NarrativeSearchDocument extends SearchDocument {
    narrative_title: string;
    data_objects: Array<NarrativeDataObject>;
    cells: Array<NarrativeCell>;
    owner: string;
    total_cells: number;
}

export type SearchHit = {
    index: string;
    id: string;
    doc: NarrativeSearchDocument;
};

export type SearchObjectsResult = {
    count: number;
    search_time: number;
    hits: Array<SearchHit>;
};

function extractNumber(obj: JSONObject, key: string): number {
    if (!(key in obj)) {
        throw new Error(`extractNumber did not find key ${key}`);
    }
    const value = obj[key];
    if (typeof value !== 'number') {
        throw new Error(`value at key ${key} is not a number, but a ${typeof value}`);
    }
    return value;
}

function extractString(obj: JSONObject, key: string): string {
    if (!(key in obj)) {
        throw new Error(`extractString did not find key ${key}`);
    }
    const value = obj[key];
    if (typeof value !== 'string') {
        throw new Error(`value at key ${key} is not a string, but a ${typeof value}`);
    }
    return value;
}

function extractBoolean(obj: JSONObject, key: string): boolean {
    if (!(key in obj)) {
        throw new Error(`extractString did not find key ${key}`);
    }
    const value = obj[key];

    if (typeof value !== 'boolean') {
        throw new Error(`value at key ${key} is not a boolean, but a ${typeof value}`);
    }
    return value;
}

function ensureJSONObject(value: JSONValue): JSONObject {
    if (typeof value !== 'object') {
        throw new Error('Incorrect type for search objects result');
    }
    if (value === null) {
        throw new Error('This value must be JSONObject, not null');
    }
    if (value instanceof Array) {
        throw new Error('This value must be JSONObject, not Array');
    }
    return value;
}

function extractJSONArray(obj: JSONObject, key: string): JSONArray {
    if (!(key in obj)) {
        throw new Error(`extractJSONArray did not find key ${key}`);
    }
    const value = obj[key];
    if (typeof value !== 'object') {
        throw new Error(`value at key ${key} is not an object, but a ${typeof value}`);
    }

    if (!(value instanceof Array)) {
        throw new Error(`value at key ${key} is not an array.`);
    }

    return value;
}

function extractJSONObject(obj: JSONObject, key: string): JSONObject {
    if (!(key in obj)) {
        throw new Error(`extractJSONArray did not find key ${key}`);
    }
    const value = obj[key];
    if (typeof value !== 'object') {
        throw new Error(`value at key ${key} is not an object, but a ${typeof value}`);
    }

    if (value === null) {
        throw new Error(`value at key ${key} is null, expected object`);
    }

    if (value instanceof Array) {
        throw new Error(`value at key ${key} is an array, expected object.`);
    }

    return value;
}

function searchObjectsResultTransformer(result: JSONValue): SearchObjectsResult {
    const searchObject = ensureJSONObject(result);
    const searchHits: Array<SearchHit> = extractJSONArray(searchObject, 'hits').map((hit) => {
        const hitObject = ensureJSONObject(hit);
        const searchDoc = extractJSONObject(hitObject, 'doc');
        return {
            index: extractString(hitObject, 'index'),
            id: extractString(hitObject, 'id'),
            doc: {
                narrative_title: extractString(searchDoc, 'narrative_title'),
                data_objects: [],
                cells: [],
                owner: extractString(searchDoc, 'owner'),
                total_cells: extractNumber(searchDoc, 'total_cells'),
                access_group: extractNumber(searchDoc, 'access_group'),
                obj_name: extractString(searchDoc, 'obj_name'),
                shared_users: [],
                timestamp: extractNumber(searchDoc, 'timestamp'),
                creation_date: extractString(searchDoc, 'creation_date'),
                is_public: extractBoolean(searchDoc, 'is_public'),
                version: extractNumber(searchDoc, 'version'),
                obj_id: extractNumber(searchDoc, 'obj_id'),
                copied: null,
                tags: [],
                obj_type_version: extractString(searchDoc, 'obj_type_version'),
                obj_type_module: extractString(searchDoc, 'obj_type_module'),
                obj_type_name: extractString(searchDoc, 'obj_type_name')
            }

        };
    });

    return {
        count: extractNumber(searchObject, 'count'),
        search_time: extractNumber(searchObject, 'search_time'),
        hits: searchHits
    };
}

function searchObjectsParamTransformer(param: SearchObjectsParam): JSONObject {
    const result: JSONObject = {};
    result['query'] = param.query;
    result['indexes'] = param.indexes;
    result['only_public'] = param.only_public ? true : false;
    result['only_private'] = param.only_private ? true : false;
    result['size'] = param.size;
    result['from'] = param.from;
    result['sort'] = param.sort;

    return result;
}

export default class SearchClient extends ServiceClient {
    module = null;

    async searchObjects(param: SearchObjectsParam): Promise<SearchObjectsResult> {
        // const callParam = searchObjectsParamTransformer(param);
        return await this.callFunc<SearchObjectsParam, SearchObjectsResult>(
            'search_objects',
            param,
            searchObjectsParamTransformer,
            searchObjectsResultTransformer);
    }
}