import React from "react";
import { actions, store } from "../store";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";

class HeaderQuote extends React.Component {
    render() {
        return (
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
                            <div class="col-md-10">
                                <div
                                    class="card-header"
                                    style={{ color: "white" }}
                                >
                                    Quote of the day :
                                </div>
                                <div class="card-body">
                                    <blockquote class="blockquote mb-0">
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
                                    </blockquote>
                                    <footer class="blockquote-footer">
                                        {this.props.isLoadingQuote
                                            ? "unknown"
                                            : this.props.quoteAuthor}
                                    </footer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(
    "quote, isLoadingQuote, quoteAuthor",
    actions
)(withRouter(HeaderQuote));
