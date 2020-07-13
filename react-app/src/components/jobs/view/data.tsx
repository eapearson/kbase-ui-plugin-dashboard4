import React from 'react';
import JobsComponent from './view';
import { Spin, Alert } from 'antd';
import { AppError } from '@kbase/ui-components';
// import MetricsServiceClient from '../../../lib/comm/dynamicServices/MetricsServiceClient';
import JobBrowserBFFClient, { JobInfo } from '../../../lib/comm2/dynamicServices/JobBrowserBFFClient';
import {
    AsyncProcessStatus, AsyncProcess, // Job, serviceJobToUIJob,
    JobsConfig
} from '../types';
import { TIMEOUT } from '../../../constants';

export interface Props {
    token: string;
    username: string;
    serviceWizardURL: string;
    config: JobsConfig;
}

interface State {
    process: AsyncProcess<Array<JobInfo>, AppError>;
}

export default class JobsCard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            process: {
                status: AsyncProcessStatus.NONE
            }
        };
    }
    async fetchJobs(): Promise<Array<JobInfo>> {
        const client = new JobBrowserBFFClient({
            url: this.props.serviceWizardURL,
            timeout: 10000,
            token: this.props.token
        });

        const to = new Date().getTime();
        const from = to - (1000 * 60 * 60 * 24 * 120);

        return client.query_jobs({
            // epoch_range: [from, to],
            // user_ids: [this.props.username]
            time_span: { from, to },
            timeout: TIMEOUT,
            offset: 0,
            limit: 10,
            sort: [{
                key: 'created',
                direction: 'descending'
            }]

        }).then((result) => {
            // const converted = result.jobs.map((job) => {
            //     return serviceJobToUIJob(job, this.props.username);
            // });

            // return converted;
            return result.jobs;
        })
            .catch((error) => {
                console.error('Error fetching job', error);
                throw error;
            });

    }
    async componentDidMount() {
        try {
            const jobs = await this.fetchJobs();

            this.setState({
                process: {
                    status: AsyncProcessStatus.COMPLETE,
                    value: jobs
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
                return <span><Spin />{' '}Fetching jobs...</span>;
            case AsyncProcessStatus.COMPLETE:
                return (
                    <JobsComponent jobs={this.state.process.value} />
                );
            case AsyncProcessStatus.ERROR:
                return this.renderError(this.state.process.error);
        }


    }
    render() {
        return (
            <div className="Jobs" data-testid="Jobs">
                {this.renderProcess()}
            </div>
        );
    }
};