import React from 'react';
import { Tooltip } from 'antd';
import './style.css';
import { NiceRelativeTime } from '@kbase/ui-components';


export interface Organization {
    id: string;
    name: string;
    createdAt: number;
}

export interface Props {
    organizations: Array<Organization>;
}

interface State {

}

export default class Organizations extends React.Component<Props, State> {

    renderOrganization(organization: Organization) {
        return <div className="LayoutTable-row" key={String(organization.id)}>
            <div className="LayoutTable-cell">
                <Tooltip title={organization.name}>
                    <a href={`/#orgs/${organization.id}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        {organization.name}
                    </a>
                </Tooltip>
            </div>
            <div className="LayoutTable-cell">
                <NiceRelativeTime time={new Date(organization.createdAt)} />
            </div>
        </div>;
    }

    renderOrganizations() {
        const rows = this.props.organizations.map((organization) => {
            return this.renderOrganization(organization);
        });

        return <div className="LayoutTable">
            {rows}
        </div>;
    }

    render() {
        return this.renderOrganizations();
    }
}