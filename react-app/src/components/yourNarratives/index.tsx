import React from 'react';
import YourNarratives, { Narrative } from './view';
import { Card, Spin, Alert } from 'antd';
import { AppError } from '@kbase/ui-components';
import SearchClient from '../../lib/comm/coreServices/Search';

export interface Props {

}

export enum AsyncProcessStatus {
    NONE,
    BUSY,
    COMPLETE,
    ERROR
}

export interface AsyncProcessBase {
    status: AsyncProcessStatus;
}

export interface AsyncProcessNone {
    status: AsyncProcessStatus.NONE;
}

export interface AsyncProcessBusy {
    status: AsyncProcessStatus.BUSY;
}

export interface AsyncProcessComplete<T> {
    status: AsyncProcessStatus.COMPLETE;
    value: T;
}

export interface AsyncProcessError<E> {
    status: AsyncProcessStatus.ERROR;
    error: E;
}

export type AsyncProcess<T, E> =
    AsyncProcessNone |
    AsyncProcessBusy |
    AsyncProcessComplete<T> |
    AsyncProcessError<E>;

interface State {
    process: AsyncProcess<Array<Narrative>, AppError>;
}

export default class YourNarrativesCard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            process: {
                status: AsyncProcessStatus.NONE
            }
        };
    }
    async fetchRecentNarratives(): Promise<Array<Narrative>> {

        const searchClient = new SearchClient({
            url: window.location.origin + '/services/searchapi2/rpc',
            timeout: 10000
        });
        // const results = await searchClient.searchObjects({
        //     object_type: ['narrative'],
        //     access_filter: {
        //         with_private: true
        //     },
        //     match_filter: {},
        // });
        const results = await searchClient.searchObjects({
            query: {
                // simple_query_string: {
                //     query: "*",
                //     analyzer: "snowball",
                //     fields: ["_all"],
                //     default_operator: "and"
                // }
                match_all: {}
            },
            from: 0,
            size: 10,
            indexes: ['narrative'],
            sort: {
                timestamp: 'desc'
            },
            only_private: true
        });
        console.log('SEARCHH', results);

        return new Promise((resolve, reject) => {
            // reject({
            //     code: 'someerror',
            //     message: 'My Error Message'
            // });
            // return;
            window.setTimeout(() => {
                resolve([
                    {
                        id: 45659,
                        title: 'All Apps - for ui examples',
                        createdAt: 1608040271000,
                        updatedAt: 1578577871000
                    },
                    {
                        id: 43669,
                        title: 'Yep, Yet Another Job Browser Test',
                        createdAt: 1606830671000,
                        updatedAt: 1607694671000
                    }
                ]);
            }, 2000);
        });
    }
    async componentDidMount() {
        try {
            const narratives = await this.fetchRecentNarratives();

            this.setState({
                process: {
                    status: AsyncProcessStatus.COMPLETE,
                    value: narratives
                }
            });
        } catch (ex) {
            console.log('ERROR', ex);
            this.setState({
                process: {
                    status: AsyncProcessStatus.ERROR,
                    error: {
                        code: 'abc',
                        message: ex.message
                    }
                }
            });
        }
    }
    renderError(error: AppError) {
        return <Alert type="error" message={error.message} />;
    }
    renderProcess() {
        switch (this.state.process.status) {
            case AsyncProcessStatus.NONE:
            case AsyncProcessStatus.BUSY:
                return <span><Spin />{' '}Fetching your narratives...</span>;
            case AsyncProcessStatus.COMPLETE:
                return (
                    <YourNarratives narratives={this.state.process.value} />
                );
            case AsyncProcessStatus.ERROR:
                return this.renderError(this.state.process.error);
        }


    }
    render() {
        return (
            <Card title="Your Narratives" size="small">
                {this.renderProcess()}
            </Card>
        );
    }
};