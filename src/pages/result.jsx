import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import ResultLists from "../components/resultLists";
import ModalLogin from "../components/modalLogin";
import ModalSignup from "../components/modalSignup";
import { actions, store } from "../store";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import ModalRegisterToko from "../components/modalRegisterToko";
import HeaderQuote from "../components/headerQuote";

class Result extends React.Component {
    componentDidMount() {
        store.setState({ isLoadingQuote: true });
        this.props.getRandomQuote();
    }
    render() {
        return (
            <body className="bgHome">
                <Header />
                <ModalLogin />
                <ModalSignup />
                <ModalRegisterToko />
                <HeaderQuote />
                <ResultLists />
                <div className="pb-5"></div>
                <div className="pb-5"></div>
                <div className="pb-5"></div>
                <Footer />
            </body>
        );
    }
}
export default connect(
    "quote, quoteAuthor, isLoadingQuote, searchKeyword, listBarangSearch",
    actions
)(withRouter(Result));
