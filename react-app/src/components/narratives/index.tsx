import { WidgetView } from '../dashboard/view';
import { NarrativesConfigProps } from './types';
import React from 'react';
import Narratives from './view';
import About from './about';
import Config from './config';

export interface Props {
    view: WidgetView;
    config: NarrativesConfigProps;
    onChangeConfig: (config: NarrativesConfigProps) => void;
}

export interface State {

}

export default class NarrativesWidget extends React.Component<Props, State> {
    render() {
        switch (this.props.view) {
            case WidgetView.FRONT:
                return <Narratives config={this.props.config} />;
            case WidgetView.ABOUT:
                return <About />;
            case WidgetView.CONFIG:
                return <Config
                    config={this.props.config}
                    onChangeConfig={this.props.onChangeConfig}
                />;
        }
    }
}