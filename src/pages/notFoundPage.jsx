import React, { PureComponent } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import HeaderQuote from "../components/headerQuote";
import ModalLogin from "../components/modalLogin";
import ModalSignup from "../components/modalSignup";
import ModalRegisterToko from "../components/modalRegisterToko";
import NotFoundProduct from "../components/notFoundProduk";
import { actions, store } from "../store";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";

class NotFoundPage extends React.Component {
    componentDidMount() {
        store.setState({ isLoadingQuote: true });
        this.props.getRandomQuote();
    }
    render() {
        return (
            <body className="bgHome">
                <Header handleSearch={this.props.handleSearch} />
                <ModalLogin />
                <ModalRegisterToko />
                <ModalSignup />
                <div className="bgHome">
                    <HeaderQuote />
                </div>
                <NotFoundProduct />
                <Footer />
            </body>
        );
    }
}
export default connect(
    "quote, quoteAuthor, isLoadingQuote, searchKeyword, listBarangSearch, baseUrl",
    actions
)(withRouter(NotFoundPage));
