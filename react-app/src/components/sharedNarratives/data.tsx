import React from 'react';
import SharedNarratives, { Narrative } from './view';
import { Spin, Alert } from 'antd';
import { AppError } from '@kbase/ui-components';
import SearchClient from '../../lib/comm/coreServices/Search';
import { AsyncProcess, AsyncProcessStatus } from '../../lib/AsyncProcess';

export interface Props {
    token: string;
    username: string;
    searchURL: string;
}

interface State {
    process: AsyncProcess<Array<Narrative>, AppError>;
}

export default class SharedNarrativesCard extends React.Component<Props, State> {
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
            url: this.props.searchURL,
            timeout: 10000
        });
        const results = await searchClient.searchObjects({
            query: {
                bool: {
                    must: [
                        {
                            term: {
                                shared_users: this.props.username
                            }
                        }
                    ],
                    must_not: [
                        {
                            term: {
                                owner: this.props.username
                            }
                        }
                    ]
                }

            },
            from: 0,
            size: 5,
            indexes: ['narrative'],
            sort: [
                {
                    timestamp: {
                        order: "desc"
                    }
                },
                "_score"
            ],
            only_public: true
        });

        const searchResult: Array<Narrative> = results.hits.map((result) => {
            const {
                access_group: id,
                narrative_title: title,
                creation_date,
                timestamp: updatedAt
            } = result.doc;

            const createdAt = new Date(creation_date).getTime();

            return { id, title, createdAt, updatedAt };
        });

        return searchResult;
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
            console.error('ERROR', ex);
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
                return <span><Spin />{' '}Fetching shared narratives...</span>;
            case AsyncProcessStatus.COMPLETE:
                return (
                    <SharedNarratives narratives={this.state.process.value} />
                );
            case AsyncProcessStatus.ERROR:
                return this.renderError(this.state.process.error);
        }


    }
    render() {
        return (
            <div className="SharedNarratives" data-testid="SharedNarratives">
                {this.renderProcess()}
            </div>
        );
    }
};