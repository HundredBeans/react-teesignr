import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../pages/home";
import Result from "../pages/result";
import SyaratKetentuan from "../pages/syaratKetentuan";
import TentangKami from "../pages/tentangKami";
import JualProduk from "../pages/jual";
import DetailProduk from "../pages/detailProduk";
import NotFoundProduct from "../components/notFoundProduk";
import NotFoundPage from "../pages/notFoundPage";
import checkoutPage from "../pages/checkoutPage";

const MainRoute = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/hasil" component={Result} />
                <Route path="/detail-produk/:id" component={DetailProduk} />
                <Route exact path="/snk-belanja" component={SyaratKetentuan} />
                <Route exact path="/tentang-kami" component={TentangKami} />
                <Route exact path="/jual" component={JualProduk} />
                <Route exact path="/checkout" component={checkoutPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </BrowserRouter>
    );
};
export default MainRoute;
