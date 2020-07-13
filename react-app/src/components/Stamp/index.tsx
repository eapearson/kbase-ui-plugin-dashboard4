import React from 'react';
import './style.css';
import { Tooltip } from 'antd';
import { InfoOutlined, WarningFilled, LoadingOutlined, ExclamationOutlined, StopOutlined, CheckOutlined } from '@ant-design/icons';

export type StampType =
    'info' | 'warning' | 'error' | 'success' | 'neutral' | 'loading';

export interface StampProps {
    type: StampType;
    // icon?: string;
    detail?: JSX.Element;
}

interface StampState {

}

export default class Stamp extends React.Component<StampProps, StampState> {

    renderClassName() {
        return `Stamp Stamp-${this.props.type}`;
    }

    renderIcon() {
        switch (this.props.type) {
            case 'info':
                return <InfoOutlined />;
            case 'warning':
                return <WarningFilled />;
            case 'loading':
                return <LoadingOutlined />;
            case 'neutral':
                return <ExclamationOutlined />;
            case 'error':
                return <StopOutlined />;
            case 'success':
                return <CheckOutlined />;
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