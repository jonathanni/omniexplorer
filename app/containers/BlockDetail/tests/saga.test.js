/**
 * Tests for BlockDetail sagas
 */

import { take, call } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import request from 'utils/request';

import { API_URL_BASE, FIRST_BLOCK } from 'containers/App/constants';
import { blockLoaded } from '../actions';

import { LOAD_BLOCK } from '../constants';
import root, { getBlock } from '../saga';

/* eslint-disable redux-saga/yield-effects */
describe('getBlock Saga', () => {
  let getBlockGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getBlockGenerator = getBlock({ FIRST_BLOCK });

    const selectDescriptor = getBlockGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getBlockGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the blockLoaded action if it requests the data successfully', () => {
    const response = {
      transactions: [],
    };

    const saga = testSaga(getBlock, { block: FIRST_BLOCK });
    const url = `${API_URL_BASE}/transaction/block/${FIRST_BLOCK}`;

    saga.next().call(request, url).next(response).put(blockLoaded(response));
  });

  /*
  it('should call the blockLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getBlockGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(blockLoadingError(response)));
  });
  */
});

describe('BlockDetail detail Saga', () => {
  it('should start task to watch for LOAD_BLOCK action', () => {
    // arrange
    const rootSaga = root();
    const payload = { block: FIRST_BLOCK };

    // assert
    expect(rootSaga.next().value).toEqual(take(LOAD_BLOCK));
    expect(rootSaga.next(payload).value).toEqual(call(getBlock, payload));
  });
});
