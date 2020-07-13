import { BaseStoreState, makeBaseStoreState } from "@kbase/ui-components";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";

export type WidgetElement = string | null;

// export type WidgetLayout = [
//     [
//         WidgetElement, WidgetElement, WidgetElement
//     ],
//     [
//         WidgetElement, WidgetElement, WidgetElement
//     ]
// ];

export type WidgetLayout = Array<Array<WidgetElement>>;

export interface Position {
    rowId: number;
    colId: number;
}

export interface StoreState extends BaseStoreState {
    dashboard: {
        widgetLayout: WidgetLayout;
        isDragging: boolean;
    };
}

export function makeInitialStoreState(): StoreState {
    const baseStoreState = makeBaseStoreState();
    return {
        ...baseStoreState,
        dashboard: {
            widgetLayout: [
                [
                    null, null, null
                ], [
                    null, null, null
                ]
            ],
            isDragging: false
        }
    };
}

export function createReduxStore() {
    return createStore(reducer, makeInitialStoreState(), compose(applyMiddleware(thunk)));
}
