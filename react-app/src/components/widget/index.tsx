import React from 'react';
import { Card, Icon, Button, Alert } from 'antd';

export interface WidgetProps {
    title: string;
    renderConfig: () => JSX.Element;
    renderAbout: () => JSX.Element;
    onMoveRight: () => void;
    onMoveLeft: () => void;
    onMoveUp: () => void;
    onMoveDown: () => void;
    showDetail: boolean;
    selectedTab: string;
    onToggleDetail: () => void;
    onSelectTab: (tab: string) => void;
}

interface WidgetState {
    // currentTab: string;
    // showTabs: boolean;
}

export default class Widget extends React.Component<WidgetProps, WidgetState> {
    tabs: Array<{
        tab: string,
        key: string;
    }>;
    constructor(props: WidgetProps) {
        super(props);
        this.tabs = [
            {
                tab: 'View',
                key: 'view'
            },
            {
                tab: 'Config',
                key: 'config'
            }, {
                tab: 'About',
                key: 'about'
            }
        ];
        this.state = {
            // currentTab: 'view',
            // showTabs: false
        };
    }
    renderConfig() {
        return <Alert type="warning" message="No config editor" />;
    }
    renderAbout() {
        return <Alert type="warning" message="No about" />;
    }
    handleTabChange(key: string) {
        this.props.onSelectTab(key);
        // this.setState({
        //     currentTab: key
        // });
    }
    renderTabPane() {
        switch (this.props.selectedTab) {
            case 'view':
                return this.props.children;
            case 'config':
                return this.props.renderConfig ? this.props.renderConfig() : this.renderConfig();
            case 'about':
                return this.props.renderAbout ? this.props.renderAbout() : this.renderAbout();
        }
    }
    toggleDetail() {
        this.props.onToggleDetail();
        // this.setState({
        //     showTabs: !this.state.showTabs,
        //     currentTab: this.state.showTabs ? 'view' : this.state.currentTab
        // });
    }
    renderExtra() {
        return <Button
            type="link"
            icon="ellipsis"
            onClick={this.toggleDetail.bind(this)} />;
    }
    render() {
        let actions: Array<React.ReactNode> = [];
        if (this.props.showDetail) {
            actions = [
                <Icon type="arrow-left" key="left" onClick={this.props.onMoveLeft} />,
                <Icon type="arrow-right" key="left" onClick={this.props.onMoveRight} />,
                <Icon type="arrow-up" key="up" onClick={this.props.onMoveUp} />,
                <Icon type="arrow-down" key="down" onClick={this.props.onMoveDown} />
            ];
        }
        if (this.props.showDetail) {
            return <div className="Widget">
                <Card
                    title={this.props.title}
                    size="small"
                    tabList={this.tabs}
                    // defaultActiveTabKey="view"
                    activeTabKey={this.props.selectedTab}
                    onTabChange={this.handleTabChange.bind(this)}
                    extra={this.renderExtra()}
                    actions={actions}>
                    {this.renderTabPane()}
                </Card>
            </div>;
        } else {
            return <div className="Widget">
                <Card
                    title={this.props.title}
                    size="small"
                    extra={this.renderExtra()}
                    actions={actions}>
                    {this.renderTabPane()}
                </Card>
            </div>;
        }
    }
}