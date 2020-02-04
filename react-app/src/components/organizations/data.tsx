import React from 'react';
import Organizations, { Organization } from './view';
import { Spin, Alert } from 'antd';
import { AppError } from '@kbase/ui-components';
import { GroupsClient } from '../../lib/comm/coreServices/Groups';

export interface Props {
    token: string;
    username: string;
    groupsURL: string;
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
    process: AsyncProcess<Array<Organization>, AppError>;
}


export default class OrganizationsCard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            process: {
                status: AsyncProcessStatus.NONE
            }
        };
    }
    async fetchOrganizations(): Promise<Array<Organization>> {
        const groupsClient = new GroupsClient({
            url: this.props.groupsURL,
            token: this.props.token
        });
        const results = await groupsClient.listGroups();

        return results.map((result) => {
            const {
                id, name, createdate: createdAt
            } = result;

            // const createdAt = new Date(creation_date).getTime();

            return { id, name, createdAt };
        })
            .sort((a, b) => {
                return (b.createdAt - a.createdAt);
            });
    }
    async componentDidMount() {
        try {
            const organizations = await this.fetchOrganizations();

            this.setState({
                process: {
                    status: AsyncProcessStatus.COMPLETE,
                    value: organizations
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
                return <span><Spin />{' '}Fetching organizations...</span>;
            case AsyncProcessStatus.COMPLETE:
                return (
                    <Organizations organizations={this.state.process.value} />
                );
            case AsyncProcessStatus.ERROR:
                return this.renderError(this.state.process.error);
        }


    }
    render() {
        return (
            <div className="Organizations" data-testid="Organizations">
                {this.renderProcess()}
            </div>
        );
    }
};