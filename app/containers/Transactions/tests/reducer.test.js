// import produce from 'immer';
import transactionsReducer from '../reducer';

export const initialState = {
  loading: false,
  transactions: [],
  pageCount: 0,
  currentPage: 1,
  txType: null,
  txCount: 0,
  unconfirmed: false,
  stamp: null,
};

describe('transactionsReducer', () => {
  it('returns the initial state', () => {
    expect(transactionsReducer(undefined, {})).toEqual(initialState);
  });
});
