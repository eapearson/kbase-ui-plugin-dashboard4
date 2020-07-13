import React from 'react';

export interface Props { };
interface State { };

export default class Config extends React.Component<Props, State> {
    render() {
        return <div>
            <h2>
                Config
            </h2>
            <p>
                This is the "config" widget...
            </p>
        </div>;
    }
}