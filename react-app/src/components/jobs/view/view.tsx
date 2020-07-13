import React from 'react';
import { Tooltip, Empty, Spin } from 'antd';
import { LoadingOutlined, ExclamationOutlined, StopOutlined, CheckOutlined } from '@ant-design/icons';
import './style.css';
// import { Job, JobStatus } from '../types';

import { NiceRelativeTime, NiceElapsedTime } from '@kbase/ui-components';
// import Stamp from '../../Stamp';
import { JobInfo } from '../../../lib/comm2/dynamicServices/JobBrowserBFFClient';
// import { JobStatus } from '../types';

export interface Props {
    jobs: Array<JobInfo>;
}

interface State {

}

export default class Jobs extends React.Component<Props, State> {

    renderJobTime(job: JobInfo) {
        switch (job.state.status) {
            case 'create':
                return <NiceElapsedTime from={job.state.create_at} precision={2} />;
            case 'queue':
                return <NiceElapsedTime from={job.state.queue_at} precision={2} />;
            case 'run':
                return <NiceElapsedTime from={job.state.run_at} />;
            case 'complete':
                return <NiceRelativeTime time={new Date(job.state.finish_at)} />;
            case 'error':
                return <NiceRelativeTime time={new Date(job.state.finish_at)} />;
            case 'terminate':
                return <NiceRelativeTime time={new Date(job.state.finish_at)} />;
        }
    }

    // renderJobStatusx(job: Job) {
    //     switch (job.status) {
    //         case JobStatus.QUEUED:
    //             return <Alert type="warning" message="queued" icon={<LoadingOutlined />} showIcon />;
    //         case JobStatus.RUNNING:
    //             return <Alert type="info" message="running" icon={<LoadingOutlined />} showIcon />;
    //         case JobStatus.FINISHED:
    //             return <Alert type="success" message="complete" icon={<CheckOutlined />} showIcon />;
    //         case JobStatus.CANCELED_QUEUED:
    //             return <Alert type="error" message="canceled" icon={<ExclamationOutlined />} showIcon />;
    //         case JobStatus.CANCELED_RUNNING:
    //             return <Alert type="error" message="canceled" icon={<ExclamationOutlined />} showIcon />;
    //         case JobStatus.ERRORED_QUEUED:
    //             return <Alert type="error" message="error" icon={<StopOutlined />} showIcon />;
    //         case JobStatus.ERRORED_RUNNING:
    //             return <Alert type="error" message="error" icon={<StopOutlined />} showIcon />;
    //     }
    // }

    renderContext(job: JobInfo) {
        switch (job.context.type) {
            case 'narrative':
                return <a href={`/narrative/${job.context.narrative.title}`} target="_blank" rel="noopener noreferrer">
                    {job.context.narrative.title}
                </a>;
            case 'workspace':
                return <span>ws ${job.context.workspace.name}</span>;
            case 'export':
                return 'export';
            case 'unknown':
                return 'unknown';
        }
    }

    renderJobStatus(job: JobInfo) {
        // const detail = <div>
        //     <i>job</i> {job.job_id}<br />
        //     <i>in</i>{this.renderContext(job)}
        // </div>;
        // const context = this.renderContext(job);
        switch (job.state.status) {
            case 'create':
            case 'queue':
                return <Spin style={{ color: 'orange' }} />;
            // return <Stamp type="loading" detail={detail}>
            //     {context}
            // </Stamp>;
            case 'run':
                return <Spin style={{ color: 'green' }} indicator={<LoadingOutlined />} />;
            // return <Alert type="info" message={context} icon={LoadingOutlined} showIcon />;
            case 'complete':
                return <CheckOutlined style={{ color: 'green' }} />;
            // return <Stamp type="success" detail={detail}>
            //     {context}
            // </Stamp>;
            // return <Alert type="success" message={context} icon={<CheckOutlined />} showIcon />;
            case 'terminate':
                return <StopOutlined style={{ color: 'black' }} />;
            // return <Stamp type="neutral" detail={detail}>
            //     {context}
            // </Stamp>;
            case 'error':
                return <ExclamationOutlined style={{ color: 'red' }} />;
        }
    }

    // renderJobStatus(job: JobInfo) {
    //     const detail = <div>
    //         <i>job</i> {job.job_id}<br />
    //         <i>in</i>{this.renderContext(job)}
    //     </div>;
    //     const context = this.renderContext(job);
    //     switch (job.state.status) {
    //         case 'create':
    //         case 'queue':
    //             return <Stamp type="loading" detail={detail}>
    //                 {context}
    //             </Stamp>;
    //         case 'run':
    //             return <Alert type="info" message={context} icon={LoadingOutlined} showIcon />;
    //         case 'complete':
    //             // return <Stamp type="success" detail={detail}>
    //             //     {context}
    //             // </Stamp>;
    //             return <Alert type="success" message={context} icon={<CheckOutlined />} showIcon />;
    //         case 'terminate':
    //             return <Stamp type="neutral" detail={detail}>
    //                 {context}
    //             </Stamp>;
    //         case 'error':
    //             return <Stamp type="error" detail={detail}>
    //                 {context}
    //             </Stamp>;
    //     }
    // }

    renderApp(job: JobInfo) {
        if (job.app === null) {
            return 'Unknown app';
        }
        return <span>
            <a href={`/#catalog/apps/${job.app.id}`} target="_blank" rel="noopener noreferrer">
                {job.app.title}
            </a>
        </span>;
    }

    renderJob(job: JobInfo) {
        const tooltip = <div className="MiniInfoTable">
            <div>
                <div>job</div>
                <div>{job.job_id}</div>
            </div>
            <div>
                <div>in</div>
                <div>{this.renderContext(job)}</div>
            </div>
        </div>;

        return <div className="LayoutTable-row" key={String(job.job_id)}>
            <div className="LayoutTable-cell">
                <Tooltip title={tooltip}>
                    {this.renderJobStatus(job)}
                </Tooltip>
            </div>
            <div className="LayoutTable-cell">
                {this.renderApp(job)}
            </div>
            <div className="LayoutTable-cell">
                {this.renderJobTime(job)}
            </div>
        </div>;
    }

    renderJobs() {
        if (this.props.jobs.length === 0) {
            return this.renderNoJobs();
        }
        const rows = this.props.jobs.map((job) => {
            return this.renderJob(job);
        });

        return <div className="LayoutTable" data-testid="Jobs-table">
            {rows}
        </div>;
    }

    renderNoJobs() {
        return <Empty description="No jobs" data-testid="Jobs-table" />;
    }

    render() {
        return this.renderJobs();
    }
}