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
    config: NarrativesConfigProps;
}

export default class NarrativesWidget extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            config: this.props.config
        };
    }
    onChangeConfigConfig(config: NarrativesConfigProps) {
        this.setState({ config });
        this.props.onChangeConfig(config);
    }
    render() {
        switch (this.props.view) {
            case WidgetView.FRONT:
                return <Narratives config={this.state.config} />;
            case WidgetView.ABOUT:
                return <About />;
            case WidgetView.CONFIG:
                return <Config
                    config={this.state.config}
                    onChangeConfig={this.props.onChangeConfig}
                />;
        }
    }
}