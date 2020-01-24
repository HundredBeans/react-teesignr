import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import FilterToko from "../components/filterToko";
import ModalLogin from "../components/modalLogin";
import ModalSignup from "../components/modalSignup";
import { actions, store } from "../store";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import ModalRegisterToko from "../components/modalRegisterToko";
import HeaderQuote from "../components/headerQuote";
import BackToTop from "../components/backToTop";

class ListToko extends React.Component {
  componentDidMount() {
    store.setState({ isLoadingQuote: true });
    this.props.getRandomQuote();
  }
  // Tambahin component will unmount
  componentWillUnmount() {
    store.setState({
      pageListToko: 1,
      searchTokoKeyword: "",
      urutanTokoBerdasarkan: "popularitas",
      urutanToko: "desc"
    });
  }
  render() {
    return (
      <body className="bgHome">
        <Header />
        <ModalLogin />
        <ModalSignup />
        <ModalRegisterToko />
        <HeaderQuote />
        <FilterToko />
        <BackToTop />
        <Footer />
      </body>
    );
  }
}
export default connect(
  "quote, quoteAuthor, isLoadingQuote, searchKeyword, listBarangSearch, searchTokoKeyword,urutanTokoBerdasarkan, urutanToko, pageListToko, baseUrl, isLoadingSearch",
  actions
)(withRouter(ListToko));
