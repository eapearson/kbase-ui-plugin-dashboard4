import React from 'react';
import { NarrativesConfigProps } from '../types';
import { Form, Row, Col, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import Logic, { LogicValue } from '../../logic';

export interface Props {
    config: NarrativesConfigProps;
    onChangeConfig: (config: NarrativesConfigProps) => void;
};
interface State { };

export default class Config extends React.Component<Props, State> {

    changeIsOwn(e: CheckboxChangeEvent) {
        console.log('is own?', e.target.checked);
    }

    changeIsSharedWith(newValue: LogicValue) {
        console.log('new logic value is ', newValue);
    }

    renderIsSharedWithToggle() {
        let value: LogicValue;
        if (typeof this.props.config.isSharedWith === 'undefined') {
            value = null;
        } else {
            value = this.props.config.isSharedWith;
        }
        return <Logic value={value} onChange={this.changeIsSharedWith.bind(this)} />;
    }

    renderForm() {
        return <Form>
            <Row>
                <Col span={24}>Filter by Ownership</Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Checkbox
                        // defaultChecked={this.props.config.isOwn}
                        onChange={this.changeIsOwn.bind(this)}
                        checked={this.props.config.isOwn}>
                        You Own
                    </Checkbox>
                </Col>
            </Row>

            <Row>
                <Col span={12}>

                    Shared With You
                </Col>
                <Col span={12}>
                    {this.renderIsSharedWithToggle()}
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Checkbox
                        // defaultChecked={this.props.config.isOwn}
                        onChange={this.changeIsOwn.bind(this)}
                        checked={this.props.config.isSharedBy}>
                        You Have Shared
                    </Checkbox>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Checkbox
                        // defaultChecked={this.props.config.isPublic}
                        onChange={this.changeIsOwn.bind(this)}
                        checked={this.props.config.isPublic}>
                        Public
                    </Checkbox>
                </Col>
            </Row>
            <Row>
                <Col span={24}>Narrative Type</Col>
                <Row>
                    <Col span={24}>
                        <Checkbox
                            // defaultChecked={this.props.config.isPublic}
                            onChange={this.changeIsOwn.bind(this)}
                            checked={this.props.config.isPublic}>
                            Public
                    </Checkbox>
                    </Col>
                </Row>
            </Row>
            <Row>
                <Col span={24}>Sorting</Col>
            </Row>
        </Form>;
    }
    render() {
        return <div>
            <h2>
                Config
            </h2>
            {this.renderForm()}
        </div>;
    }
}