import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import FilterToko from '../components/filterToko';
import ModalLogin from '../components/modalLogin';
import ModalSignup from '../components/modalSignup';
import { actions, store } from '../store';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import ModalRegisterToko from '../components/modalRegisterToko';
import HeaderQuote from '../components/headerQuote';
import axios from 'axios';
import BackToTop from '../components/backToTop';

class ListToko extends React.Component {
  getListToko = () => {
    console.log('klik');
    store.setState({ isLoadingSearch: true });
    const keyword = this.props.searchTokoKeyword;
    const orderby = this.props.urutanTokoBerdasarkan;
    const sort = this.props.urutanToko;
    const req = {
      method: 'get',
      url:
        this.props.baseUrl +
        `/toko?search=${keyword}&orderby=${orderby}&sort=${sort}`
    };
    axios(req).then(function(response) {
      store.setState({
        listTokoSearch: response.data,
        isLoadingSearch: false
      });
      console.log(response.data);
    });
  };
  componentDidMount() {
    store.setState({ isLoadingQuote: true });
    this.props.getRandomQuote();
    this.getListToko();
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
  'quote, quoteAuthor, isLoadingQuote, searchKeyword, listBarangSearch, searchTokoKeyword,urutanTokoBerdasarkan, urutanToko, pageListToko, baseUrl',
  actions
)(withRouter(ListToko));
