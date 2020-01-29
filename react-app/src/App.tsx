import React from "react";
import { Provider } from "react-redux";
import { createReduxStore } from "./redux/store";
import { AppBase, AuthGate } from "@kbase/ui-components";
import "./App.css";
import Dashboard from './components/dashboard';

const store = createReduxStore();

interface AppProps { }

interface AppState { }

export default class App<AppProps, AppState> extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppBase>
                    <AuthGate required={true}>
                        <div className="App">
                            <Dashboard />
                        </div>
                    </AuthGate>
                </AppBase>
            </Provider>
        );
    }
}