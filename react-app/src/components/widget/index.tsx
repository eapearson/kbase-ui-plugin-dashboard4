import React from 'react';
import { Card, Button, Alert } from 'antd';
import {
    ArrowLeftOutlined, ArrowRightOutlined, ArrowUpOutlined, ArrowDownOutlined, EllipsisOutlined, BorderOuterOutlined
} from '@ant-design/icons';
import './style.css';

export interface WidgetProps {
    title: string;
    onMoveRight: () => void;
    onMoveLeft: () => void;
    onMoveUp: () => void;
    onMoveDown: () => void;
    showDetail: boolean;
    selectedTab: string;
    onToggleDetail: () => void;
    onSelectTab: (tab: string) => void;
    id: string;
    dragStart: () => void;
    dragEnd: () => void;
}

interface WidgetState {
    // currentTab: string;
    // showTabs: boolean;
    dragImageNode: Element | null;
    dragging: boolean;
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
                tab: 'view',
                key: 'view'
            },
            {
                tab: 'config',
                key: 'config'
            }, {
                tab: 'about',
                key: 'about'
            }
        ];
        this.state = {
            // currentTab: 'view',
            // showTabs: false
            dragging: false,
            dragImageNode: null
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
        // switch (this.props.selectedTab) {
        //     case 'view':
        //         return this.props.children;
        //     case 'config':
        //         return this.props.renderConfig ? this.props.renderConfig() : this.renderConfig();
        //     case 'about':
        //         return this.props.renderAbout ? this.props.renderAbout() : this.renderAbout();
        // }
        return this.props.children;
    }
    toggleDetail() {
        this.props.onToggleDetail();
        // this.setState({
        //     showTabs: !this.state.showTabs,
        //     currentTab: this.state.showTabs ? 'view' : this.state.currentTab
        // });
    }
    renderDetailToggleButton() {
        if (this.props.showDetail) {
            return <EllipsisOutlined rotate={90} />;
        } else {
            return <EllipsisOutlined />;
        }
    }
    onDragStart2(dragEvent: React.DragEvent<HTMLSpanElement>) {
        dragEvent.dataTransfer.clearData();
        const data: string = JSON.stringify({
            widgetId: this.props.id
        });
        dragEvent.dataTransfer.setData('text/plain', data);
        this.props.dragStart();
    }
    renderExtra() {
        return <>
            <Button
                type="link"
                icon={this.renderDetailToggleButton()}
                onClick={this.toggleDetail.bind(this)} />
            <BorderOuterOutlined
                onDragStart={this.onDragStart2.bind(this)}
                onDragEnd={this.onDragEnd.bind(this)}
                draggable
            />
        </>;
    }

    dragImage() {
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        canvas.style.position = 'absolute';
        canvas.style.left = '-100px';
        const context = canvas.getContext('2d');
        if (context === null) {
            throw new Error('Could not get drag context!');
        }
        context.lineWidth = 2;
        context.strokeStyle = 'red';
        context.strokeRect(5, 5, 90, 90);
        document.body.appendChild(canvas);

        return canvas as Element;
    }


    // onDragStart(event: React.DragEvent<HTMLDivElement>) {
    //     // this.setState({
    //     //     dragging: true
    //     // });
    //     console.log('drag start??');
    //     const dataTransfer = event.dataTransfer;
    //     dataTransfer.setData('text/plain', 'hello');
    //     const dragImage = this.dragImage();
    //     this.setState({
    //         dragging: true,
    //         dragImageNode: dragImage
    //     });
    //     dataTransfer.setDragImage(dragImage, 50, 50);
    // }

    onDragEnd(dragEvent: React.DragEvent<HTMLDivElement>) {
        if (this.state.dragImageNode && this.state.dragImageNode.parentNode) {
            this.state.dragImageNode.parentNode.removeChild(this.state.dragImageNode);
        }

        this.setState({
            dragging: false,
            dragImageNode: null
        });

        this.props.dragEnd();
    }

    renderTitle() {
        return <div
        // onDragStart={this.onDragStart.bind(this)}
        // onDragEnd={this.onDragEnd.bind(this)}
        // draggable
        >
            {this.props.title}
        </div>;
    }

    render() {
        let actions: Array<React.ReactNode> = [];
        if (this.props.showDetail) {
            actions = [
                <Button
                    type="link"
                    icon={<ArrowLeftOutlined />}
                    onClick={this.props.onMoveLeft}>
                </Button>,
                <ArrowRightOutlined key="left" onClick={this.props.onMoveRight} />,
                <ArrowUpOutlined key="up" onClick={this.props.onMoveUp} />,
                <ArrowDownOutlined key="down" onClick={this.props.onMoveDown} />
            ];
        }
        if (this.props.showDetail) {
            return <div className="Widget" >
                <Card
                    title={this.renderTitle()}
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
            return <div className="Widget"
            >

                <Card
                    title={this.renderTitle()}
                    size="small"
                    extra={this.renderExtra()}

                    actions={actions}>
                    {this.renderTabPane()}
                </Card>
            </div>;
        }
    }
}