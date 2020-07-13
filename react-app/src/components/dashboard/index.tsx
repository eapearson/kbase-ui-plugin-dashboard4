import Component from './view';
import { StoreState, WidgetLayout } from '../../redux/store';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { sendTitle } from '@kbase/ui-components';
import { addWidget, DropType, dragStart, dragEnd } from '../../redux/actions';
import { Position } from '../../redux/store';
import { spacerSelected } from '../../redux/actions';

export interface OwnProps {

}

interface StateProps {
    // token: string;
    // username: string;
    // serviceWizardURL: string;
    widgetLayout: WidgetLayout;
    isDragging: boolean;
}

interface DispatchProps {
    setTitle: (title: string) => void;
    addWidget: (widgetId: string, position: Position) => void;
    spacerSelected: (type: DropType, widgetId: string, position: Position) => void;
    dragStart: () => void;
    dragEnd: () => void;
}

function mapStateToProps(state: StoreState, props: OwnProps): StateProps {
    // const {
    //     auth: { userAuthorization },
    //     app: {
    //         config: {
    //             services: {
    //                 ServiceWizard: { url: serviceWizardURL }
    //             }
    //         }
    //     }
    // } = state;

    // if (!userAuthorization) {
    //     throw new Error('Invalid state: token required');
    // }
    // const { token, username } = userAuthorization;

    // return { token, username, serviceWizardURL };
    const {
        dashboard: {
            widgetLayout,
            isDragging
        }
    } = state;
    return { widgetLayout, isDragging };
}

function mapDispatchToProps(dispatch: Dispatch<Action>, ownProps: OwnProps): DispatchProps {
    return {
        setTitle: (title: string) => {
            dispatch(sendTitle(title) as any);
        },
        addWidget: (widgetId: string, position: Position) => {
            dispatch(addWidget(widgetId, position));
        },
        spacerSelected: (type: DropType, widgetId: string, position: Position) => {
            dispatch(spacerSelected(type, widgetId, position));
        },
        dragStart: () => {
            dispatch(dragStart());
        },
        dragEnd: () => {
            dispatch(dragEnd());
        }
    };
}

export default connect<StateProps, DispatchProps, OwnProps, StoreState>(
    mapStateToProps,
    mapDispatchToProps
)(Component);