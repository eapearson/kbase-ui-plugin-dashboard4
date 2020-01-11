import React from "react";
import { Provider } from "react-redux";
import { createReduxStore } from "./redux/store";
import { AppBase } from "@kbase/ui-components";
import "./App.css";
import { Button } from "antd";

const store = createReduxStore();

interface AppProps { }

interface AppState { }

export default class App<AppProps, AppState> extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppBase>
                    <div className="App">
                        <p>Hello!</p>
                        <Button>Hi!</Button>
                    </div>
                </AppBase>
            </Provider>
        );
    }
}