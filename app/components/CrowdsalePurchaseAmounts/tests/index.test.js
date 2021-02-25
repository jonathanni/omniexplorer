/**
 *
 * Tests for CrowdsalePurchaseAmounts
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import CrowdsalePurchaseAmounts from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

const defaultProps = {
  amount: 0,
  divisible: false,
  desiredToken: {
    name: '',
    propertyid: 0,
  },
  crowdsale: {
    propertyname: '',
    propertyid: 0,
  },
  purchasedtokens: 0,
  issuertokens: 0,
};

describe('<CrowdsalePurchaseAmounts />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <CrowdsalePurchaseAmounts {...defaultProps} />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  const ReactComponent = () => <CrowdsalePurchaseAmounts />;

  it('should render <CrowdsalePurchaseAmounts />', () => {
    const expectedState = { mockedStated: true };
    const mapStateToProps = (state) => ({
      state,
    });
    const stateStore = {
      getState: () => expectedState,
      subscribe: () => ({}),
      dispatch: () => ({}),
    };

    const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
    const component = shallow(<ConnectedComponent store={stateStore} />);
    expect(component.dive().props().state).toBe(expectedState);
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <CrowdsalePurchaseAmounts {...defaultProps} />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
