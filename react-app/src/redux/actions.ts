import { Action } from "redux";
import { Position } from './store';

export enum DashboardActions {
    ADD_WIDGET = "@Dashboard:ADD_WIDGET",
    REMOVE_WIDGET = "@Dashboard:REMOVE_WIDGET",
    SET_WIDGETS = "@Dashboard:SET_WIDGET",
    MOVE_WIDGET = "@Dashboard:MOVE_WIDGET",
    SPACER_SELECTED = "@Dashboard:SPACER_SELECTED",
    DRAG_START = "@Dashboard:DRAG_START",
    DRAG_END = "@Dashboard:DRAG_END"
}

/*
    A widget is a mapping from a string id to a configuration, as far 
    as the store is concerned.
    The widget component itself is outside the scope of the store, and is
    the responsibility of the Dashboard component to map the id to 
    the component, feed configuration, etc.
    // TODO: configuration
*/

export interface AddWidget extends Action<DashboardActions.ADD_WIDGET> {
    type: DashboardActions.ADD_WIDGET,
    widgetId: string;
    position: Position;
}

export function addWidget(widgetId: string, position: Position): AddWidget {
    return {
        type: DashboardActions.ADD_WIDGET,
        widgetId, position
    };
}

export type DropType = 'insert' | 'replace';


export interface SpacerSelected extends Action<DashboardActions.SPACER_SELECTED> {
    type: DashboardActions.SPACER_SELECTED,
    dropType: DropType;
    widgetId: string;
    position: Position;
}

export function spacerSelected(dropType: DropType, widgetId: string, position: Position): SpacerSelected {
    return {
        type: DashboardActions.SPACER_SELECTED,
        dropType, widgetId, position
    };
}

export interface DragStart extends Action<DashboardActions.DRAG_START> {
    type: DashboardActions.DRAG_START;
}

export function dragStart(): DragStart {
    return {
        type: DashboardActions.DRAG_START
    };
}

export interface DragEnd extends Action<DashboardActions.DRAG_END> {
    type: DashboardActions.DRAG_END;
}

export function dragEnd(): DragEnd {
    return {
        type: DashboardActions.DRAG_END
    };
}
