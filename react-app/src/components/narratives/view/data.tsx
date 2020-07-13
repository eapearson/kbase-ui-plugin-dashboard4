import React from 'react';
import Narratives, { Narrative } from './view';
import { Spin, Alert } from 'antd';
import { AppError } from '@kbase/ui-components';
import SearchClient from '../../../lib/comm/coreServices/Search';
import { AsyncProcess, AsyncProcessStatus } from '../../../lib/AsyncProcess';
import { NarrativesConfigProps } from '../types';

export interface NarrativesProps {
    token: string;
    username: string;
    searchURL: string;
    // controls what narratives are displayed
    config: NarrativesConfigProps;
}

interface NarrativesState {
    process: AsyncProcess<Array<Narrative>, AppError>;
}

export default class DataWrapper extends React.Component<NarrativesProps, NarrativesState> {
    constructor(props: NarrativesProps) {
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
        const query: any = {
            bool: {
                must: [],
                must_not: [{
                    term: {
                        is_temporary: true
                    }
                }]
            }
        };
        if (typeof this.props.config.isPublic !== 'undefined') {
            query.bool.must.push({
                term: {
                    is_public: this.props.config.isPublic
                }
            });
        }
        if (typeof this.props.config.isOwn !== 'undefined') {
            if (this.props.config.isOwn) {
                query.bool.must.push({
                    term: {
                        creator: this.props.username
                    }
                });
            } else {
                query.bool.must_not.push({
                    term: {
                        creator: this.props.username
                    }
                });
            }
        }
        if (typeof this.props.config.isSharedWith !== 'undefined') {
            if (this.props.config.isSharedWith) {
                query.bool.must.push({
                    term: {
                        shared_users: this.props.username
                    }
                });
            } else {
                query.bool.must_not.push({
                    term: {
                        shared_users: this.props.username
                    }
                });
            }
        }
        if (typeof this.props.config.isNarratorial !== 'undefined') {
            if (this.props.config.isNarratorial) {
                query.bool.must.push({
                    term: {
                        is_narratorial: true
                    }
                });
            }
        }

        const results = await searchClient.searchObjects({
            query,
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
            ]
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
                return <span><Spin />{' '}Fetching your narratives...</span>;
            case AsyncProcessStatus.COMPLETE:
                return (
                    <Narratives narratives={this.state.process.value} />
                );
            case AsyncProcessStatus.ERROR:
                return this.renderError(this.state.process.error);
        }
    }
    render() {
        return <div className="YourNarratives">
            {this.renderProcess()}
        </div>;
    }
};
