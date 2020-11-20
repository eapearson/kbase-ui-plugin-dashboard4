import React from 'react';
import { NarrativesConfigProps } from '../types';
import { Form, Row, Col } from 'antd';
import Logic, { LogicValue } from '../../logic';

export interface Props {
    config: NarrativesConfigProps;
    onChangeConfig: (config: NarrativesConfigProps) => void;
};
interface State { };

export default class Config extends React.Component<Props, State> {

    changeIsOwn(newValue: LogicValue) {
        console.log('is own?', newValue);
    }

    changeIsSharedWith(newValue: LogicValue) {
        console.log('new logic value is ', newValue);
    }

    changeIsSharedBy(newValue: LogicValue) {
        console.log('new logic value is ', newValue);
    }

    changeIsPublic(newValue: LogicValue) {
        console.log('new logic value is ', newValue);
    }

    changeIsNarratorial(newValue: LogicValue) {
        console.log('new narratorial value is ', newValue);
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
    renderIsSharedByToggle() {
        let value: LogicValue;
        if (typeof this.props.config.isSharedBy === 'undefined') {
            value = null;
        } else {
            value = this.props.config.isSharedBy;
        }
        return <Logic value={value} onChange={this.changeIsSharedBy.bind(this)} />;
    }
    renderIsOwnToggle() {
        let value: LogicValue;
        if (typeof this.props.config.isOwn === 'undefined') {
            value = null;
        } else {
            value = this.props.config.isOwn;
        }
        return <Logic value={value} onChange={this.changeIsOwn.bind(this)} />;
    }

    renderIsPublicToggle() {
        let value: LogicValue;
        if (typeof this.props.config.isPublic === 'undefined') {
            value = null;
        } else {
            value = this.props.config.isPublic;
        }
        return <Logic value={value} onChange={this.changeIsPublic.bind(this)} />;
    }

    renderIsNarratorialToggle() {
        let value: LogicValue;
        if (typeof this.props.config.isNarratorial === 'undefined') {
            value = null;
        } else {
            value = this.props.config.isNarratorial;
        }
        return <Logic value={value} onChange={this.changeIsNarratorial.bind(this)} />;
    }

    //    <Row>
    //     <Col span={24}>
    //         <Checkbox
    //             // defaultChecked={this.props.config.isOwn}
    //             onChange={this.changeIsOwn.bind(this)}
    //             checked={this.props.config.isOwn}>
    //             You Own
    //         </Checkbox>
    //     </Col>
    // </Row>

    renderForm() {
        return <Form>
            <Row>
                <Col span={24}><b>Filter</b></Col>
            </Row>
            <Row>
                <Col span={12}>

                    You Own
                </Col>
                <Col span={12}>
                    {this.renderIsOwnToggle()}
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

                <Col span={12}>
                    You Have Shared
                </Col>
                <Col span={12}>
                    {this.renderIsSharedByToggle()}
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    Public
                </Col>
                <Col span={12}>
                    {this.renderIsPublicToggle()}
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    Narratorial
                </Col>
                <Col span={12}>
                    {this.renderIsNarratorialToggle()}
                </Col>
            </Row>

        </Form>;
    }
    render() {
        return <div>
            {this.renderForm()}
        </div>;
    }
}