import React from 'react';

export interface Props {
};
interface State { };

export default class Options extends React.Component<Props, State> {
    render() {
        return <div>
            <h2>
                Options
            </h2>
            <div>
                <a href="/#narrativemanager/new" target="_blank">New Narrative</a>
            </div>
        </div>;
    }
}