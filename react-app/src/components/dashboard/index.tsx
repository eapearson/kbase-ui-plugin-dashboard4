import React from 'react';
import { Row, Col, Card } from 'antd';
import YourNarrativesCard from '../yourNarratives';

export interface DashboardProps {

}

interface DashboardState {

}

export default class Dashboard extends React.Component<DashboardProps, DashboardState> {

    render() {
       
        return <div>
            <Row>
                <Col span={8}>
                    <YourNarrativesCard />
                </Col>
                <Col span={8}>
                    <Card title="Shared Narratives">
                        card content here...
                </Card>
                </Col>
                <Col span={8}>
                    <Card title="Public Narratives">
                        card content here...
                </Card>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Card title="Tutorial Narratives">
                        <YourNarrativesCard />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Jobs">
                        card content here...
                </Card>
                </Col>
                <Col span={8}>
                    <Card title="Organizations
                    ">
                        card content here...
                </Card>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Card title="Apps">
                        <YourNarrativesCard  />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="xxx">
                        card content here...
                </Card>
                </Col>
                <Col span={8}>
                    <Card title="xxx
                    ">
                        card content here...
                </Card>
                </Col>
            </Row>
        </div >;
    }
};