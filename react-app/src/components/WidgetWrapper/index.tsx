import React from 'react';
import { Position } from '../../redux/store';
import './style.css';

export interface WidgetWrapperProps {
    rowId: number;
    colId: number;
    widgetId: string | null;
    isDragging: boolean;
    onDrop: (widgetId: string, position: Position) => void;
}

interface WidgetWrapperState {
    style: React.CSSProperties | null;
}

export default class WidgetWrapper extends React.Component<WidgetWrapperProps, WidgetWrapperState> {
    constructor(props: WidgetWrapperProps) {
        super(props);
        this.state = {
            style: null
        };
    }

    onDragEnter(e: React.DragEvent<HTMLDivElement>) {
        this.setState({
            style: {
                backgroundColor: 'rgba(200, 200, 200, 0.5)',
                flexBasis: '5em'
            }
        });
    }

    onDragLeave(e: React.DragEvent<HTMLDivElement>) {
        this.setState({
            style: null
        });
    }

    onDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
    }

    onDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        this.setState({
            style: null
        });

        const stringData = e.dataTransfer.getData('text/plain');

        if (stringData) {
            try {
                const data = JSON.parse(stringData);
                this.props.onDrop(
                    data.widgetId,
                    {
                        rowId: this.props.rowId,
                        colId: this.props.colId
                    });
            } catch (ex) {
                console.error('Error parsing drag data', ex.message, stringData);
            }
        }
    }

    render() {
        const style = this.state.style || {};
        if (this.props.isDragging) {
            style.zIndex = 100;
        }
        return <div className="WidgetWrapper"
            style={this.state.style || undefined}
            onDragEnter={this.onDragEnter.bind(this)}
            onDragLeave={this.onDragLeave.bind(this)}
            onDragOver={this.onDragOver.bind(this)}
            onDrop={this.onDrop.bind(this)}></div>;
    }
}