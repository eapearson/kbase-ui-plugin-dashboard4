import React from "react";
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";

export type LogicValue = boolean | null;

enum RadioValue {
    TRUE = 'true',
    FALSE = 'false',
    MEH = 'meh'
}

export interface LogicProps {
    value: LogicValue;
    onChange: (v: LogicValue) => void;
}

interface LogicState {
    // radioValue: LogicValue;
}

function logicValueToRadioValue(value: LogicValue): RadioValue {
    switch (value) {
        case true:
            return RadioValue.TRUE;
        case false:
            return RadioValue.FALSE;
        case null:
            return RadioValue.MEH;
    }
}

function radioValueToLogicValue(radioValue: RadioValue): LogicValue {
    switch (radioValue) {
        case RadioValue.TRUE:
            return true;
        case RadioValue.FALSE:
            return false;
        case RadioValue.MEH:
            return null;
    }
}

export default class Logic extends React.Component<LogicProps, LogicState>{
    constructor(props: LogicProps) {
        super(props);
        this.state = {
            value: this.props.value
        };
    }

    onChangeState(e: RadioChangeEvent) {
        const radioValue = e.target.value as RadioValue;
        const value: LogicValue = radioValueToLogicValue(radioValue);
        this.props.onChange(value);
    }

    render() {
        return <Radio.Group
            defaultValue={logicValueToRadioValue(this.props.value)}
            // value={this.state.value}
            onChange={this.onChangeState.bind(this)}>
            <Radio.Button value={RadioValue.TRUE}>yes</Radio.Button>
            <Radio.Button value={RadioValue.FALSE}>no</Radio.Button>
            <Radio.Button value={RadioValue.MEH}>meh</Radio.Button>
        </Radio.Group>;
    }
}