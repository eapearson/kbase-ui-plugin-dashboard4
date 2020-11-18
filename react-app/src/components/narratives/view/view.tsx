import React from 'react';
import { Tooltip, Empty, Input, Select } from 'antd';
import './style.css';
import { NiceRelativeTime } from '@kbase/ui-components';
import { SelectValue } from 'antd/lib/select';

export interface Narrative {
    id: number;
    title: string;
    createdAt: number;
    updatedAt: number;
}

export interface Props {
    narratives: Array<Narrative>;
    onSearch: (query: string) => void;
    onCount: (count: number) => void;
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

    onSearchChange(value: string) {
        this.props.onSearch(value);
    }

    onCountChange(value: number) {
        this.props.onCount(value);
    }

    renderToolbar() {
        return <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: '1 1 0px' }}>
                <Input.Search onSearch={this.onSearchChange.bind(this)} allowClear={true} />
            </div>
            <div style={{ flex: '1 1 0px' }}>
                {' '}First <Select<number> onChange={this.onCountChange.bind(this)} defaultValue={5}>
                    <Select.Option value={5}>5</Select.Option>
                    <Select.Option value={20}>20</Select.Option>
                    <Select.Option value={100}>100</Select.Option>
                </Select> narratives
            </div>
        </div>;
    }

    render() {
        return <div className="YourNarratives" data-testid="YourNarratives-table">
            {this.renderToolbar()}
            {this.renderNarratives()}
        </div>;
    }
}