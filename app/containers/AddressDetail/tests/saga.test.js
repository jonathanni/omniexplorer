/**
 * Tests for AddressDetail sagas
 */
import {
  API_URL_BASE,
  API_URL_BLOCKCHAIN_BTC_BALANCE,
  FN_API_URL_BLOCKCHAIR_BTC_BALANCE,
} from 'containers/App/constants';

import { all, put, take, call } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import request from 'utils/request';
import encoderURIParams from 'utils/encoderURIParams';

import { updateFetch } from 'components/Token/actions';
import { addressLoaded } from 'containers/AddressDetail/actions';

import { LOAD_ADDRESS } from 'containers/AddressDetail/constants';
import root, { getAddress } from '../saga';

const addr = '1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF';

/* eslint-disable redux-saga/yield-effects */
describe('getAddress Saga', () => {
  let getAddressGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getAddressGenerator = getAddress({ addr });

    const selectDescriptor = getAddressGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getAddressGenerator.next(addr).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  const saga = cloneableGenerator(getAddress)({ addr });
  const response = {
    balance: [
      {
        divisible: true,
        frozen: '0',
        id: '0',
        pendingneg: '0',
        pendingpos: '0',
        propertyinfo: {
          blocktime: 1231006505,
          data:
            'The Times 03/Jan/2009 Chancellor on brink of second bailout for banks',
          divisible: true,
          flags: {},
          issuer: 'Satoshi Nakamoto',
          name: 'BTC',
          propertyid: 0,
          rdata: null,
          registered: false,
          totaltokens: '18637850.00000000',
          url: 'http://www.bitcoin.org',
        },
        symbol: 'BTC',
        value: '0',
      },
    ],
  };

  const responseBalance = {
    [addr]: {
      final_balance: 7995720580428,
      n_tx: 368,
      total_received: 7995720580428,
    },
  };

  const responseBalanceBlockchair = {
    data: {
      [addr]: {
        address: {
          balance: 7995720579651,
          received: 7995720579651,
          spent: 0,
          output_count: 368,
        },
      },
    },
  };

  const url = `${API_URL_BASE}/address/addr`;
  const urlBTCBalance = `${API_URL_BLOCKCHAIN_BTC_BALANCE}${addr}`;
  const body = encoderURIParams({ addr });
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  };

  it('should dispatch the addressLoaded action if it requests the data successfully', () => {
    expect(saga.next().value).toEqual(
      all([call(request, url, options), call(request, urlBTCBalance)]),
    );
  });

  describe('and blockchain.info provides a valid response', () => {
    let clone;

    beforeAll(() => {
      clone = saga.clone();
    });

    it('does provide a valid response', () => {
      expect(clone.next([response, responseBalance]).value).toEqual(
        put(addressLoaded(response)),
      );
      expect(clone.next().value).toEqual([
        put(updateFetch(response.balance[0].propertyinfo)),
      ]);
    });
  });

  describe('and blockchain.info did not provide a valid response', () => {
    let clone;

    beforeAll(() => {
      clone = saga.clone();
    });

    it('requests from blockchair and provides a valid response', () => {
      const urlBTCBalanceAlternative = FN_API_URL_BLOCKCHAIR_BTC_BALANCE({
        address: addr,
      });

      expect(clone.next([response, {}]).value).toEqual(
        call(request, urlBTCBalanceAlternative),
      );
      expect(clone.next(responseBalanceBlockchair).value).toEqual(
        put(addressLoaded(response)),
      );
      expect(clone.next().value).toEqual([
        put(updateFetch(response.balance[0].propertyinfo)),
      ]);
    });
  });

  /*
  it('should call the addressLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getAddressGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(addressLoadingError(response)));
  });
  */
});

describe('Address detail Saga', () => {
  it('should start task to watch for LOAD_ADDRESS action', () => {
    // arrange
    const rootSaga = root();
    const payload = { addr };

    // assert
    expect(rootSaga.next().value).toEqual(take(LOAD_ADDRESS));
    expect(rootSaga.next(payload).value).toEqual(call(getAddress, payload));
  });
});
