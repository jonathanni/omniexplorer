// import produce from 'immer';
import transactionDetailReducer from '../reducer';

export const initialState = {
  transaction: {
    notFound: false,
  },
  loading: true,
};

describe('transactionDetailReducer', () => {
  it('returns the initial state', () => {
    expect(transactionDetailReducer(undefined, {})).toEqual(initialState);
  });
});
