import ActivationsReducer, { initialState } from '../reducer';

describe('ActivationsReducer', () => {
  it('returns the initial state', () => {
    expect(ActivationsReducer(undefined, {})).toEqual(initialState);
  });
});
