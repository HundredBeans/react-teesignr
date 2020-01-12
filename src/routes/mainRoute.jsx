import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../pages/home";
import Result from "../pages/result";
import SyaratKetentuan from "../pages/syaratKetentuan";
import TentangKami from "../pages/tentangKami";
import JualProduk from "../pages/jual";

const MainRoute = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/hasil" component={Result} />
                <Route exact path="/snk-belanja" component={SyaratKetentuan} />
                <Route exact path="/tentang-kami" component={TentangKami} />
                <Route exact path="/jual" component={JualProduk} />
            </Switch>
        </BrowserRouter>
    );
};
export default MainRoute;
