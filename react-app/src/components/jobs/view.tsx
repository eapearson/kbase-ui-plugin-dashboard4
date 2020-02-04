import React from 'react';
import { Tooltip, Alert, Icon } from 'antd';
import './style.css';
import { Job, JobStatus } from './common';
import { NiceRelativeTime, NiceElapsedTime } from '@kbase/ui-components';
import Stamp from '../Stamp';

export interface Props {
    jobs: Array<Job>;
}

interface State {

}

export default class PublicNarratives extends React.Component<Props, State> {

    renderJobTime(job: Job) {
        switch (job.status) {
            case JobStatus.QUEUED:
                return <NiceElapsedTime from={job.queuedAt} precision={2} />;
            case JobStatus.RUNNING:
                return <NiceElapsedTime from={job.runAt} />;
            case JobStatus.FINISHED:
                return <NiceRelativeTime time={new Date(job.finishAt)} />;
            case JobStatus.CANCELED_QUEUED:
                return <NiceRelativeTime time={new Date(job.finishAt)} />;
            case JobStatus.CANCELED_RUNNING:
                return <NiceRelativeTime time={new Date(job.finishAt)} />;
            case JobStatus.ERRORED_QUEUED:
                return <NiceRelativeTime time={new Date(job.finishAt)} />;
            case JobStatus.ERRORED_RUNNING:
                return <NiceRelativeTime time={new Date(job.finishAt)} />;
        }
    }

    renderJobStatusx(job: Job) {
        switch (job.status) {
            case JobStatus.QUEUED:
                return <Alert type="warning" message="queued" icon={<Icon type="loading" />} showIcon />;
            case JobStatus.RUNNING:
                return <Alert type="info" message="running" icon={<Icon type="loading" />} showIcon />;
            case JobStatus.FINISHED:
                return <Alert type="success" message="complete" icon={<Icon type="check" />} showIcon />;
            case JobStatus.CANCELED_QUEUED:
                return <Alert type="error" message="canceled" icon={<Icon type="exclamation" />} showIcon />;
            case JobStatus.CANCELED_RUNNING:
                return <Alert type="error" message="canceled" icon={<Icon type="exclamation" />} showIcon />;
            case JobStatus.ERRORED_QUEUED:
                return <Alert type="error" message="error" icon={<Icon type="stop" />} showIcon />;
            case JobStatus.ERRORED_RUNNING:
                return <Alert type="error" message="error" icon={<Icon type="stop" />} showIcon />;
        }
    }

    renderJobStatus(job: Job) {
        const detail = <div>
            <i>job</i> {job.id}<br />
            <i>in</i> <a href={`/narrative/${job.narrativeID}`} target="_blank">{job.narrativeTitle}</a>
        </div>;
        switch (job.status) {
            case JobStatus.QUEUED:
                return <Stamp type="warning" icon="loading" detail={detail}>
                    queued
                </Stamp>;
            // return <div className="Stamp Stamp-warning">
            //     <Icon type="loading" /> queued
            // </div>;
            case JobStatus.RUNNING:
                return <Alert type="info" message="running" icon={<Icon type="loading" />} showIcon />;
            case JobStatus.FINISHED:
                return <Stamp type="success" icon="check" detail={detail}>
                    complete!
                </Stamp>;
            // return <Alert type="success" message="complete" icon={<Icon type="check" />} showIcon />;
            case JobStatus.CANCELED_QUEUED:
                return <Alert type="error" message="canceled" icon={<Icon type="exclamation" />} showIcon />;
            case JobStatus.CANCELED_RUNNING:
                return <Alert type="error" message="canceled" icon={<Icon type="exclamation" />} showIcon />;
            case JobStatus.ERRORED_QUEUED:
                return <Alert type="error" message="error" icon={<Icon type="stop" />} showIcon />;
            case JobStatus.ERRORED_RUNNING:
                return <Alert type="error" message="error" icon={<Icon type="stop" />} showIcon />;
        }
    }

    renderJob(job: Job) {
        console.log('job', job);

        const tooltip = <div>
            <i>job</i> {job.id}<br />
            <i>in</i> <a href={`/narrative/${job.narrativeID}`} target="_blank">{job.narrativeTitle}</a>
        </div>;

        return <div className="LayoutTable-row" key={String(job.id)}>
            <div className="LayoutTable-cell">
                <Tooltip title={tooltip}>
                    {this.renderJobStatus(job)}
                </Tooltip>
            </div>
            <div className="LayoutTable-cell">
                {this.renderJobTime(job)}
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