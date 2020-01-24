import React from "react";
import Header from "../components/header";
import ModalLogin from "../components/modalLogin";
import ModalSignup from "../components/modalSignup";
import ModalRegisterToko from "../components/modalRegisterToko";
import HomeHead from "../components/homeHead";
import ListHome from "../components/listHome";
import Footer from "../components/footer";
import { actions } from "../store";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import BackToTop from "../components/backToTop";

class Home extends React.Component {
  render() {
    return (
      <body className="bgHome">
        <Header />
        <ModalLogin />
        <ModalSignup />
        <ModalRegisterToko />
        <div className="container-fluid">
          <HomeHead />
          <ListHome />
        </div>
        <div className="pb-5"></div>
        <div className="pb-5"></div>
        <div className="pb-5"></div>
        <BackToTop />
        <Footer />
      </body>
    );
  }
}
export default connect(
  "searchKeyword, listBarangSearch",
  actions
)(withRouter(Home));
