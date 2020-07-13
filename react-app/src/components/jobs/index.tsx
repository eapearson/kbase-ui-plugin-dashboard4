import { WidgetView } from '../dashboard/view';
import { JobsConfig } from './types';
import React from 'react';
import Jobs from './view';
import About from './about';
import Config from './config';

export interface Props {
    view: WidgetView;
    config: JobsConfig;
}

export interface State {

}

export default class JobsWidget extends React.Component<Props, State> {
    render() {
        switch (this.props.view) {
            case WidgetView.FRONT:
                return <Jobs config={this.props.config} />;
            case WidgetView.ABOUT:
                return <About />;
            case WidgetView.CONFIG:
                return <Config />;
        }
    }
}