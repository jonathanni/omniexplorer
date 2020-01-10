/**
 *
 * Search
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Col, Container, Jumbotron, Row, Table } from 'reactstrap';
import isEmpty from 'lodash/isEmpty';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import getPropByTx from 'utils/getPropByTx';

import Wallet from 'components/Wallet';
import TransactionInfo from 'components/TransactionInfo';
import Asset from 'components/Asset';
import LoadingIndicator from 'components/LoadingIndicator';
import ContainerBase from 'components/ContainerBase';
import StyledLink from 'components/StyledLink';

import { startFetch } from 'components/Token/actions';
import { makeSelectLoading, makeSelectProperties, makeSelectProperty } from 'components/Token/selectors';

import makeSelectSearch from './selectors';
import searchReducer from './reducer';
import searchSaga from './saga';
import { loadSearch } from './actions';

const StyledTH = styled.th`
  border: none !important;
  font-weight: normal !important;
`;

const StyledAssetTH = styled(StyledTH).attrs({
  colSpan: '4',
})``;

const StyledTR = styled.tr.attrs({
  className: 'text-light bg-secondary',
})``;

export function Search(props) {
  const { query } = props.match.params;

  useInjectReducer({
    key: 'search',
    reducer: searchReducer,
  });
  useInjectSaga({
    key: 'search',
    saga: searchSaga,
  });

  useEffect(() => {
    props.loadSearch(query);
  }, [query]);

  const isLoading = (!props.search.loading && !props.tokens.isFetching && !props.tokens.lastFetched);
  if (props.search.tx.propertyid && isLoading) {
    // At this point, we're in the "commit" phase, so it's safe to load the new data.
    props.getProperty(props.search.tx.propertyid);
    return;
  }

  let wallet = null;
  let assets = null;
  let tx = null;

  const loading = (
    <Container>
      <LoadingIndicator />
    </Container>
  );

  if (props.search.loading) {
    return loading;
  }

  if (!isEmpty(props.search.tx.type)) {
    const property = getPropByTx(props.search.tx, props.properties);

    if (!property) return loading;
    tx = <TransactionInfo {...props.search.tx} asset={property} />;
  }

  const walletlink = () => {
    if (
      props.search.address.balance &&
      props.search.address.balance.length > 0
    ) {
      return (
        <div className="container-fluid">
          <StyledLink
            to={{
              pathname: `/address/${query}`,
              state: { state: props.state },
            }}
          >
            Click Here for full address details.
          </StyledLink>
        </div>
      );
    }
  };

  if (
    props.search.address.balance &&
    props.search.address.balance.length > 0
  ) {
    wallet = (
      <Wallet {...props.search} addr={query} extra={walletlink()} />
    );
  }

  if (props.search.asset.length > 0) {
    assets = (
      <Table responsive className="mt-1">
        <thead>
        <tr>
          <StyledAssetTH>
            <h4 className="align-self-end text-sm-left">
              <strong className="d-block">Properties</strong>
            </h4>
          </StyledAssetTH>
        </tr>
        <StyledTR>
          <StyledTH />
          <StyledTH>ID</StyledTH>
          <StyledTH>Name</StyledTH>
          <StyledTH>Issuer</StyledTH>
        </StyledTR>
        </thead>
        <tbody>
        {props.search.asset.map((x, idx) => (
          <Asset
            {...x}
            key={x[2] + idx}
          />
        ))}
        </tbody>
      </Table>
    );
  }

  if (!wallet && !assets && !tx) {
    return (
      <Container fluid>
        <Row>
          <Col sm>
            <div>
              <Jumbotron className="text-center">
                <h3 className="display-3">No results found :(</h3>
                <p className="lead">
                  Try using a valid transaction id, address, property id or
                  asset name.
                </p>
              </Jumbotron>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  const StyledRow = styled(Row)`
      background-color: #7c8fa0;
      color: white;
      padding-top: 1rem;
      padding-bottom: 1rem;
    `;
  return (
    <ContainerBase fluid>
      <StyledRow>
        <Col sm>
          <h3>
            Showing results for:&nbsp;
            <div className="d-md-inline d-block-down-md" style={{
              overflow: 'auto',
              overflowY: 'hidden',
            }}>
              <mark>{query}</mark>
            </div>
          </h3>
        </Col>
      </StyledRow>
      <Row>
        <Col sm>{wallet}</Col>
      </Row>
      <Row>
        <Col sm>{assets}</Col>
      </Row>
      <Row>
        <Col sm>{tx}</Col>
      </Row>
    </ContainerBase>
  );
}

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadSearch: PropTypes.func,
  search: PropTypes.object,
  getProperty: PropTypes.func.isRequired,
  properties: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  search: makeSelectSearch(),
  tokens: makeSelectProperties(),
  tokenIsFetching: state => makeSelectLoading(state),
  properties: state => makeSelectProperty(state),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadSearch: query => dispatch(loadSearch(query)),
    getProperty: propertyId => dispatch(startFetch(propertyId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(Search);
