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
import CheckoutPage from "../pages/checkoutPage";
import BuktiPembelian from "../pages/buktiPembelian";
import KeranjangPage from "../pages/keranjangPage";
import TokoPage from "../pages/tokoPage";
import ProfilePage from "../pages/riwayatTransaksi";
import RiwayatTransaksi from "../pages/riwayatTransaksi";

const MainRoute = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/hasil" component={Result} />
                <Route path="/detail-produk/:id" component={DetailProduk} />
                <Route path="/toko/:id" component={TokoPage} />
                <Route exact path="/snk-belanja" component={SyaratKetentuan} />
                <Route exact path="/tentang-kami" component={TentangKami} />
                <Route exact path="/jual" component={JualProduk} />
                <Route exact path="/checkout" component={CheckoutPage} />
                <Route exact path="/post-checkout" component={BuktiPembelian} />
                <Route exact path="/keranjang" component={KeranjangPage} />
                <Route exact path="/profil/" component={ProfilePage} />
                <Route
                    exact
                    path="/profil/transaksi"
                    component={RiwayatTransaksi}
                />
                <Route
                    path="/profil/transaksi/:id"
                    component={RiwayatTransaksi}
                />
                <Route component={NotFoundPage} />
            </Switch>
        </BrowserRouter>
    );
};
export default MainRoute;
