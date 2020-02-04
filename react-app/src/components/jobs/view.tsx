import React from 'react';
import { Tooltip } from 'antd';
import './style.css';
import { Job } from './common';

export interface Props {
    jobs: Array<Job>;
}

interface State {

}

export default class PublicNarratives extends React.Component<Props, State> {

    renderJob(job: Job) {
        console.log('job', job);

        return <div className="LayoutTable-row" key={String(job.id)}>
            <div className="LayoutTable-cell">
                <Tooltip title={job.id}>
                    {job.id}
                </Tooltip>
            </div>
            <div className="LayoutTable-cell">
                {job.status}
            </div>
        </div>;
    }

    renderJobs() {
        const rows = this.props.jobs.map((job) => {
            return this.renderJob(job);
        });

        return <div className="LayoutTable" data-testid="Jobs-table">
            {rows}
        </div>;
    }

    render() {
        return this.renderJobs();
    }
}