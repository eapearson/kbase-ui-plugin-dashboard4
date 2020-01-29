import React from 'react';

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

export default class TutorialNarratives extends React.Component<Props, State> {

    renderNarrative() {

    }

    renderNarratives() {
        return this.props.narratives.map((narrative) => {
            return;
        });
    }

    render() {
        return <div>
            {this.renderNarratives()}
        </div>;
    }
}