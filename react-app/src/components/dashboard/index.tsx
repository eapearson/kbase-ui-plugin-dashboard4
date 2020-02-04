import Component from './view';
import { StoreState } from '../../redux/store';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { sendTitle } from '@kbase/ui-components';

export interface OwnProps {

}

interface StateProps {
    // token: string;
    // username: string;
    // serviceWizardURL: string;
}

interface DispatchProps {
    setTitle: (title: string) => void;
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
    return {};
}

function mapDispatchToProps(dispatch: Dispatch<Action>, ownProps: OwnProps): DispatchProps {
    return {
        setTitle: (title: string) => {
            dispatch(sendTitle(title) as any);
        }
    };
}

export default connect<StateProps, DispatchProps, OwnProps, StoreState>(
    mapStateToProps,
    mapDispatchToProps
)(Component);