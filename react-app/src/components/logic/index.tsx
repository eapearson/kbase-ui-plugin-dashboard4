import React from "react";
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";

export type LogicValue = boolean | null;

export interface LogicProps {
    value: LogicValue;
    onChange: (v: LogicValue) => void;
}

interface LogicState {

}

export default class Logic extends React.Component<LogicProps, LogicState>{
    onChangeState(e: RadioChangeEvent) {
        console.log('change state to', e.target.value);
        const value = e.target.value;
        let newValue: LogicValue;
        switch (value) {
            case true:
            case false:
                newValue = value;
                break;
            case '':
                newValue = null;
                break;
            default:
                console.error('Expected true, false, or empty string, got', value);
                throw new Error('Runtime logic error');
        }
        this.props.onChange(newValue);
    }
    render() {
        return <Radio.Group
            value={this.props.value}
            onChange={this.onChangeState.bind(this)}>
            <Radio.Button value={true}>yes</Radio.Button>
            <Radio.Button value={false}>no</Radio.Button>
            <Radio.Button value={''}>meh</Radio.Button>
        </Radio.Group>;
    }
}