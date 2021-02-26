// import { fromJS } from 'immutable';

import { initialState } from '../reducer';
import { selectActivationsDomain, makeSelectActivations } from '../selectors';

describe('selectActivationsDomain', () => {
  it('should select the activations state', () => {
    const activationsDetailState = initialState;
    const mockedState = { activations: activationsDetailState };
    expect(selectActivationsDomain(mockedState)).toEqual(
      activationsDetailState,
    );
  });
});

describe('makeSelectActivationsDetail', () => {
  const activationsSelector = makeSelectActivations();
  it('should select the loading', () => {
    const activationsState = { loading: true };
    const mockedState = {
      activations: activationsState,
    };
    expect(activationsSelector(mockedState)).toEqual(activationsState);
  });
});
