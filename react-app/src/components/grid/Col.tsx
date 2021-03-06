import React from 'react';
import './Col.css';

export interface GridProps {
    id: number;
    style?: React.CSSProperties;
}

interface ColState {
    dragging: boolean;
    dragged: boolean;
}

export default class Col extends React.Component<GridProps, ColState> {
    constructor(props: GridProps) {
        super(props);
        this.state = {
            dragging: false,
            dragged: false
        };
    }

    onDragEnter(e: React.DragEvent<HTMLDivElement>) {
        this.setState({
            dragged: true
        });
    }

    onDragLeave(e: React.DragEvent<HTMLDivElement>) {
        this.setState({
            dragged: false
        });
    }


    onDrag() {
        this.setState({
            dragging: true
        });
    }

    onDragEnd() {
        this.setState({
            dragging: false
        });
    }

    render() {
        const dragClass = [
            'GridCol-Drag'
        ];
        if (this.state.dragging) {
            dragClass.push('-dragging');
        }
        if (this.state.dragged) {
            dragClass.push('-dragged');
        }
        return <div
            className="GridCol"
            key={`col:${this.props.id}`}
            style={this.props.style}
        >
            {this.props.children}
        </div>;
    }
}