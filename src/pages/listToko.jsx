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
    axios(req)
      .then(function(response) {
        store.setState({
          listTokoSearch: response.data,
          isLoadingSearch: false
        });
        console.log(response.data);
        console.log(orderby);
        console.log(sort);
      })
      .catch(function(error) {
        console.log(error);
        console.log(error.response);
      });
  };
  // Tambahin component will unmount
  componentWillUnmount() {
    store.setState({
      pageListToko: 1,
      searchTokoKeyword: '',
      urutanTokoBerdasarkan: 'popularitas',
      urutanToko: 'desc'
    });
  }
  componentDidMount() {
    store.setState({ isLoadingQuote: true });
    this.props.getRandomQuote();
    this.getListToko();
    console.log(this.props.listTokoSearch);
  }
  render() {
    return (
      <body className="bgHome">
        <Header />
        <ModalLogin />
        <ModalSignup />
        <ModalRegisterToko />
        <HeaderQuote />
        <FilterToko getListToko={this.getListToko} />
        <BackToTop />
        <Footer />
      </body>
    );
  }
}
export default connect(
  'quote, quoteAuthor, isLoadingQuote, searchKeyword, listBarangSearch, searchTokoKeyword,urutanTokoBerdasarkan, urutanToko, pageListToko, baseUrl, isLoadingSearch',
  actions
)(withRouter(ListToko));
