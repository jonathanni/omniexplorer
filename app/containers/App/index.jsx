/* eslint-disable no-restricted-globals */
/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import TransactionDetail from 'containers/TransactionDetail';
import Transactions from 'containers/Transactions';
import AddressDetail from 'containers/AddressDetail';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Search from 'containers/Search/Loadable';
import Properties from 'containers/Properties/Loadable';
import AssetDetail from 'containers/AssetDetail/Loadable';
import CrowdsaleDetail from 'containers/CrowdsaleDetail/Loadable';
import Promote from 'containers/Promote/Loadable';
import Feedback from 'containers/Feedback/Loadable';
import Crowdsales from 'containers/Crowdsales';
import BlockDetail from 'containers/BlockDetail';
import HistoryChart from 'containers/HistoryChart';
import FullBlockList from 'containers/FullBlockList';
import Activations from 'containers/Activations';
// import Exchange from 'containers/Exchange';

import Footer from 'components/Footer';
import Header from 'components/Header';
import ErrorBoundary from 'components/ErrorBoundary';

import DevTools from 'utils/devTools';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { startFetch } from 'components/ServiceBlock/actions';

import { useInjectSaga } from 'utils/injectSaga';
import tokenSaga from 'components/Token/saga';
import activationsSaga from 'containers/Activations/saga';
import statusSaga from 'components/ServiceBlock/saga';
import GlobalStyle from '../../global-styles';

// Set Moment Global locale
// Moment.globalLocale = 'en-gb';
// import Moment from 'react-moment';

// Import DevTools, only for dev environment
const isDev = process.env.NODE_ENV !== 'production';

const AppWrapper = styled.div`
  max-width: calc(1170px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export function App({
  loadStatus,
}) {
  useInjectSaga({
    key: 'tokenDetail',
    saga: tokenSaga,
  });
  useInjectSaga({
    key: 'status',
    saga: statusSaga,
  });

  useInjectSaga({
    key: 'activations',
    saga: activationsSaga,
  })

  useEffect(() => {
    console.log('load status..');
    loadStatus();
  }, []);

  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Omni Explorer"
        defaultTitle="Omni Explorer - The block explorer for Omni Token, Tether, USDT, MaidSafe and Omni Layer Tokens / Cryptocurrencies"
      >
        <meta
          name="description"
          content="The block explorer for Omni Token, Tether, USDT, MaidSafe and Omni Layer Tokens / Cryptocurrencies"
        />
        <link rel="canonical" href="https://omniexplorer.info" />
        <meta name="referrer" content="always" />
      </Helmet>
      <Header />
      <ErrorBoundary>
        <Switch>
          <Route exact path="/:block(\d+)?">
		    <HomePage />
		  </Route>
          <Route path="/tx/:tx">
		    <TransactionDetail />
		  </Route>
          <Route path="/transactions/unconfirmed">
		    <Transactions />
		  </Route>
          <Route
            path="/address/:address/:page(\d+)?"
            key={location.pathname}>
			<AddressDetail />
		  </Route>
          <Route
            path="/search/:query"
            key={location.pathname}>
			<Search />
		  </Route>
          <Route
            path="/properties/:query"
            key={location.pathname}>
			<Properties />
		  </Route>
          <Route
            path="/asset/:propertyid(\d+)"
            key={location.pathname}>
			<AssetDetail />
		  </Route>
          <Route exact path="/crowdsales/:ecosystem">
		    <Crowdsales />
		  </Route>
          <Route
            path="/crowdsale/:crowdsaleid(\d+)"
            key={location.pathname}>
			<CrowdsaleDetail />
		  </Route>
          <Route
            exact
            path="/block/:block(\d+)"
            key={location.pathname}>
			<BlockDetail />
		  </Route>
          <Route exact path="/promote">
		    <Promote />
		  </Route>
          <Route exact path="/submitfeedback">
		    <Feedback />
		  </Route>
          {/*<Route exact path="/analytics" component={HistoryChart} />*/}
          <Route exact path="/blocks/:block(\d+)?">
		    <FullBlockList />
		  </Route>
          <Route exact path="/activations">
		    <Activations />
		  </Route>
          {/*<Route exact path="/exchange" component={Exchange} />*/}
          <Route path="">
		    <NotFoundPage />
		  </Route>
          <Route>
		    <NotFoundPage />
		  </Route>
        </Switch>
      </ErrorBoundary>
      <Footer />
      {isDev ? <DevTools /> : <div />}
      <GlobalStyle />
    </AppWrapper>
  );
}

App.propTypes = {
  loadStatus: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    loadStatus: () => dispatch(startFetch()),
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  // memo,
)(App);
