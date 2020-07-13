import { baseReducer, BaseStoreState } from "@kbase/ui-components";
import { StoreState, WidgetLayout } from "./store";
import { Action, Reducer } from "redux";
import { AddWidget, DashboardActions, SpacerSelected, DragStart, DragEnd } from "./actions";
import { Position } from './store';

export function addWidget(store: StoreState, action: AddWidget): StoreState {
    const {
        dashboard: {
            widgetLayout
        }
    } = store;
    widgetLayout[action.position.rowId][action.position.colId] = action.widgetId;

    return {
        ...store,
        dashboard: {
            ...store.dashboard,
            widgetLayout
        }
    };
}

function insertCell(widgetLayout: WidgetLayout, widgetPosition: Position, widgetId: string, spacerPosition: Position): WidgetLayout {
    // If dropped on the spacer just to the left or right, ignore.
    if ((widgetPosition.rowId === spacerPosition.rowId) &&
        ((widgetPosition.colId === spacerPosition.colId) ||
            (widgetPosition.colId + 1 === spacerPosition.colId))) {
        return widgetLayout;
    }

    const newWidgetLayout = widgetLayout.slice();

    const spacerRowId = spacerPosition.rowId;
    const spacerColId = spacerPosition.colId;
    newWidgetLayout[widgetPosition.rowId][widgetPosition.colId] = null;

    const firstNullCell = widgetLayout[spacerRowId].indexOf(null);

    if (firstNullCell === -1) {
        console.warn('Cannot insert into row without empty cells');
        return widgetLayout;
    }

    // if he null col is to the left, shift cols to the left to fill it

    // if the null col is immediately to the right or left, just fill it in.
    if (firstNullCell === spacerColId) {
        // immediately after
        newWidgetLayout[spacerRowId][firstNullCell] = widgetId;
    } else if (firstNullCell === spacerColId - 1) {
        // immediately after
        newWidgetLayout[spacerRowId][firstNullCell] = widgetId;
    } else if (firstNullCell < spacerColId) {
        // Shift cols before the target left one
        for (let colId = firstNullCell; colId < spacerColId; colId += 1) {
            newWidgetLayout[spacerRowId][colId] =
                widgetLayout[spacerRowId][colId + 1];
        }
        // this leaves the colum immediately to the left of the spacer available to occupy.
        newWidgetLayout[spacerRowId][spacerColId - 1] = widgetId;
    } else {
        // Shift cols after the target right one
        for (let colId = firstNullCell; colId > spacerColId; colId -= 1) {
            newWidgetLayout[spacerRowId][colId] =
                widgetLayout[spacerRowId][colId - 1];
        }
        newWidgetLayout[spacerRowId][spacerColId] = widgetId;
    }
    // newWidgetLayout[spacerRowId][destinationColId] = action.widgetId;
    return newWidgetLayout;
}

function replaceCell(widgetLayout: WidgetLayout, widgetPosition: Position, widgetId: string, targetPosition: Position): WidgetLayout {
    const newWidgetLayout = widgetLayout.slice();

    const targetRowId = targetPosition.rowId;
    const targetColId = targetPosition.colId;

    const targetWidgetId = widgetLayout[targetRowId][targetColId];
    newWidgetLayout[widgetPosition.rowId][widgetPosition.colId] = targetWidgetId;
    newWidgetLayout[targetRowId][targetColId] = widgetId;

    return newWidgetLayout;
}

export function spacerSelected(store: StoreState, action: SpacerSelected): StoreState {
    const {
        dashboard: {
            widgetLayout
        }
    } = store;

    // where is this one?
    const widgetPosition = (() => {
        for (let rowId = 0; rowId < 2; rowId += 1) {
            for (let colId = 0; colId < 3; colId += 1) {
                if (widgetLayout[rowId][colId] === action.widgetId) {
                    return {
                        rowId, colId
                    };
                }
            }
        }
    })();

    if (!widgetPosition) {
        console.warn('umm, did not find widget: ' + action.widgetId, widgetLayout);
        return store;
    }

    const newWidgetLayout = (() => {
        switch (action.dropType) {
            case 'insert':
                return insertCell(widgetLayout, widgetPosition, action.widgetId, action.position);
            case 'replace':
                return replaceCell(widgetLayout, widgetPosition, action.widgetId, action.position);
        }
    })();

    return {
        ...store,
        dashboard: {
            ...store.dashboard,
            widgetLayout: newWidgetLayout
        }
    };
}

function dragStart(store: StoreState, action: DragStart): StoreState {
    return {
        ...store,
        dashboard: {
            ...store.dashboard,
            isDragging: true
        }
    };
}

function dragEnd(store: StoreState, action: DragEnd): StoreState {
    return {
        ...store,
        dashboard: {
            ...store.dashboard,
            isDragging: false
        }
    };
}

const reducer: Reducer<StoreState | undefined, Action> = (state: StoreState | undefined, action: Action) => {
    const baseState = baseReducer(state as BaseStoreState, action);

    if (!state) {
        return state;
    }

    switch (action.type) {
        case DashboardActions.ADD_WIDGET:
            return addWidget(state, action as AddWidget);
        case DashboardActions.SPACER_SELECTED:
            return spacerSelected(state, action as SpacerSelected);
        case DashboardActions.DRAG_START:
            return dragStart(state, action as DragStart);
        case DashboardActions.DRAG_END:
            return dragEnd(state, action as DragEnd);
    }


    if (baseState) {
        return baseState as StoreState;
    }
    return state;
};

export default reducer;