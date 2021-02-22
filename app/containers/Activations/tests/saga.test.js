/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { take, call } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import request from 'utils/request';

import { API_URL_BASE } from 'containers/App/constants';
import { LOAD_ACTIVATIONS } from '../constants';
import { activationsLoaded } from '../actions';
import root, { getActivations } from '../saga';

describe('getActivations Saga', () => {
  let getActivationsGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getActivationsGenerator = getActivations();

    const callDescriptor = getActivationsGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the getActivations action if it requests the data successfully', () => {
    const response = {
      loading: true,
      list: [],
      error: null,
    };

    const saga = testSaga(getActivations);
    const url = `${API_URL_BASE}/system/featureactivations`;

    saga
      .next()
      .call(request, url)
      .next(response)
      .put(activationsLoaded(response));
  });
});

describe('Activations detail Saga', () => {
  it('should start task to watch for LOAD_ACTIVATIONS action', () => {
    // arrange
    const rootSaga = root();
    const payload = {};

    // assert
    expect(rootSaga.next().value).toEqual(take(LOAD_ACTIVATIONS));
    expect(rootSaga.next(payload).value).toEqual(call(getActivations, payload));
  });
});
