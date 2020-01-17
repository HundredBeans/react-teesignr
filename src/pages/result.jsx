import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import ResultLists from '../components/resultLists';
import ModalLogin from '../components/modalLogin';
import ModalSignup from '../components/modalSignup';
import { actions, store } from '../store';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import ModalRegisterToko from '../components/modalRegisterToko';
import HeaderQuote from '../components/headerQuote';
import BackToTop from '../components/backToTop';

class Result extends React.Component {
  componentDidMount() {
    store.setState({ isLoadingQuote: true });
    this.props.getRandomQuote();
  }
  // Tambahin component will unmount
  componentWillUnmount() {
    store.setState({
      hargaMin: '0',
      hargaMax: '999999999999999999',
      urutanBerdasarkan: 'terjual',
      urutan: 'desc',
      pageBarang: 1,
      searchKeyword: ''
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
        <ResultLists />
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
  'quote, quoteAuthor, isLoadingQuote, searchKeyword, listBarangSearch, hargaMin,hargaMax,urutanBerdasarkan, urutan, pageBarang',
  actions
)(withRouter(Result));
