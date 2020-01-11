import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../pages/home";
import Result from "../pages/result";
import SyaratKetentuan from "../pages/syaratKetentuan";

const MainRoute = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/result" component={Result} />
                <Route path="/snk-belanja" component={SyaratKetentuan} />
            </Switch>
        </BrowserRouter>
    );
};
export default MainRoute;
