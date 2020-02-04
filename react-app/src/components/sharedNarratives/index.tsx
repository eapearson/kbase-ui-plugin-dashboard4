import Component from './data';
import { StoreState } from '../../redux/store';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

export interface OwnProps {

}

interface StateProps {
    token: string;
    username: string;
    searchURL: string;
}

interface DispatchProps {

}

function mapStateToProps(state: StoreState, props: OwnProps): StateProps {
    const {
        auth: { userAuthorization },
        app: {
            config: {
                baseUrl
                // services: {

                //     // ServiceWizard: { url: serviceWizardURL }
                // }
            }
        }
    } = state;

    if (!userAuthorization) {
        throw new Error('Invalid state: token required');
    }
    const { token, username } = userAuthorization;

    // TODO: search2 need to be in kbase-ui-lib.
    const searchURL = baseUrl + '/services/searchapi2/rpc';

    return { token, username, searchURL };
}

function mapDispatchToProps(dispatch: Dispatch<Action>, ownProps: OwnProps): DispatchProps {
    return {};
}

export default connect<StateProps, DispatchProps, OwnProps, StoreState>(
    mapStateToProps,
    mapDispatchToProps
)(Component);