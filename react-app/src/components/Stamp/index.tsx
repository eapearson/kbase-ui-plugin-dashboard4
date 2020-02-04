import React from 'react';
import './style.css';
import { Icon, Tooltip } from 'antd';

export type StampType =
    'info' | 'warning' | 'error' | 'success' | 'neutral';

export interface StampProps {
    type: StampType;
    icon?: string;
    detail?: JSX.Element;
}

interface StampState {

}



export default class Stamp extends React.Component<StampProps, StampState> {

    renderClassName() {
        return `Stamp Stamp-${this.props.type}`;
    }

    renderIcon() {
        if (this.props.icon) {
            return <Icon type={this.props.icon} />;
        }
    }

    renderPlain() {
        return <div className={this.renderClassName()}>
            {this.renderIcon()} {this.props.children}
        </div>;
    }

    renderWithDetail() {
        return <Tooltip title={this.props.detail} placement="right">
            <div className={this.renderClassName()}>
                {this.renderIcon()} {this.props.children}
            </div>
        </Tooltip>;
    }

    render() {
        if (this.props.detail) {
            return this.renderWithDetail();
        } else {
            return this.renderPlain();
        }

    }
}