import React from 'react';
import { Tooltip, Empty } from 'antd';
import './style.css';
import { NiceRelativeTime } from '@kbase/ui-components';

export interface Narrative {
    id: number;
    title: string;
    createdAt: number;
    updatedAt: number;
}

export interface Props {
    narratives: Array<Narrative>;
}

interface State {

}

export default class Narratives extends React.Component<Props, State> {

    renderNarrative(narrative: Narrative) {
        return <div className="LayoutTable-row" key={String(narrative.id)}>
            <div className="LayoutTable-cell">
                <Tooltip title={narrative.title}>
                    <a href={`/narrative/${narrative.id}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        {narrative.title}
                    </a>
                </Tooltip>
            </div>
            <div className="LayoutTable-cell">
                <NiceRelativeTime time={new Date(narrative.updatedAt)} />
            </div>
        </div>;
    }

    renderNarratives() {
        if (this.props.narratives.length === 0) {
            return this.renderNoNarratives();
        }
        const rows = this.props.narratives.map((narrative) => {
            return this.renderNarrative(narrative);
        });

        return <div className="LayoutTable">
            {rows}
        </div>;
    }

    renderNoNarratives() {
        return <Empty description='No Narratives' />;
    }

    render() {

        return <div className="YourNarratives" data-testid="YourNarratives-table">
            {this.renderNarratives()}
        </div>;
    }
}