import React from 'react';
import './Spacer.css';
import { Position } from '../../redux/store';

export interface SpacerProps {
    rowId: number;
    id: number;
    onSpacerSelected: (widgetId: string, position: Position) => void;
}

interface SpacerState {
    // backgroundColor: string;
    // width: number;
    style: React.CSSProperties | null;
}

export default class Spacer extends React.Component<SpacerProps, SpacerState> {
    constructor(props: SpacerProps) {
        super(props);
        this.state = {
            style: null
        };
    }

    onDragEnter(e: React.DragEvent<HTMLDivElement>) {
        this.setState({
            style: {
                backgroundColor: 'silver',
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
                this.props.onSpacerSelected(
                    data.widgetId,
                    {
                        rowId: this.props.rowId,
                        colId: this.props.id
                    });
            } catch (ex) {
                console.error('Error parsing drag data', ex.message, stringData);
            }
        }
    }

    render() {
        return <div
            className="GridSpacer"
            key={`spacer:${this.props.id}`}
            style={this.state.style || undefined}
            onDragEnter={this.onDragEnter.bind(this)}
            onDragLeave={this.onDragLeave.bind(this)}
            onDragOver={this.onDragOver.bind(this)}
            onDrop={this.onDrop.bind(this)}
        >
        </div>;
    }
}