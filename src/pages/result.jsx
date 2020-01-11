import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import ResultLists from "../components/resultLists";
import ModalLogin from "../components/modalLogin";
import ModalSignup from "../components/modalSignup";
import { actions, store } from "../store";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";

class Result extends React.Component {
    componentDidMount() {
        this.props.getRandomQuote();
    }
    render() {
        return (
            <body className="bgHome">
                <Header />
                <ModalLogin />
                <ModalSignup />
                <div className="container-fluid border-bottom">
                    <div className="container py-3">
                        <div
                            class="card mb-3 col-md-12"
                            style={{
                                backgroundColor: "#1D2124"
                            }}
                        >
                            <div class="row no-gutters">
                                <div class="col-md-2 py-2">
                                    <img
                                        src={require("../img/aestheticsmall.jpg")}
                                        class="card-img"
                                        alt="aesthetic"
                                    />
                                </div>
                                <div class="col-md-10 my-auto">
                                    <div class="card-body">
                                        <p
                                            class="card-text"
                                            style={{ color: "white" }}
                                        >
                                            "
                                            {this.props.isLoadingQuote
                                                ? "Loading quotes"
                                                : `${this.props.quote}`}
                                            "
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ResultLists />
                <div className="pb-5"></div>
                <div className="pb-5"></div>
                <div className="pb-5"></div>
                <Footer />
            </body>
        );
    }
}
export default connect("quote, isLoadingQuote", actions)(withRouter(Result));
