// import { selectExchangeDomain } from '../selectors';

import { initialState } from '../reducer';
import makeSelectExchange, { selectExchangeDomain } from '../selectors';

describe('selectExchangeDomain', () => {
  it('should select the exchange state', () => {
    const exchangeDetailState = initialState;
    const mockedState = { exchange: exchangeDetailState };
    expect(selectExchangeDomain(mockedState)).toEqual(exchangeDetailState);
  });
});

describe('makeSelectExchangeDetail', () => {
  const exchangeSelector = makeSelectExchange();
  it('should select the loading', () => {
    const exchangeState = { loading: true };
    const mockedState = {
      exchange: exchangeState,
    };
    expect(exchangeSelector(mockedState)).toEqual(exchangeState);
  });
});
