import React from "react";
import MainRoute from "../src/routes/mainRoute";
import { Provider } from "unistore/react";
import { store } from "./store";
import "./style/bootstrap.min.css";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <MainRoute />
            </Provider>
        </div>
    );
}

export default App;
