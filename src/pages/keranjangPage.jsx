import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import HeaderQuote from "../components/headerQuote";
import ModalLogin from "../components/modalLogin";
import ModalSignup from "../components/modalSignup";
import ModalRegisterToko from "../components/modalRegisterToko";
import { actions, store } from "../store";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import Axios from "axios";

class KeranjangPage extends React.Component {
    render() {
        return (
            <body class="bgHome">
                <Header handleSearch={this.props.handleSearch} />
                <ModalLogin />
                <ModalRegisterToko />
                <ModalSignup />
                <HeaderQuote />

                <Footer />
            </body>
        );
    }
}
export default connect(
    "baseUrl, isLoadingQuote, listCheckout, baseUrl, token,",
    actions
)(withRouter(KeranjangPage));
