import React from 'react';

export interface Props { };
interface State { };

export default class About extends React.Component<Props, State> {
    render() {
        return <div>
            <h2>
                Narratives
            </h2>
            <p>
                This is the "narratives" widget...
            </p>
        </div>;
    }
}