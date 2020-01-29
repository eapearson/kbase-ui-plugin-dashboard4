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

export default class SharedNarratives extends React.Component<Props, State> {
    render() {
        return <div>
            recent narratives here...
        </div>;
    }
}