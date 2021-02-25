import React from 'react';
import { IntlProvider } from 'react-intl';
// import ReactTestUtils from 'react-dom/test-utils';
import { connect } from 'react-redux';
import { mount, shallow } from 'enzyme';

import SanitizedFormattedNumber from '../index';
// import { createMockStore } from 'redux-test-utils';

describe('<SanitizedFormattedNumber />', () => {
  const ReactComponent = () => <SanitizedFormattedNumber />;
  it('should render <SanitizedFormattedNumber />', () => {
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
    const component = shallow(
      <ConnectedComponent value="1.001" store={stateStore} />,
    );
    expect(component.dive().props().state).toBe(expectedState);
  });

  it('should format number', () => {
    const component = (
      <IntlProvider locale="en">
        <SanitizedFormattedNumber value="1001.001000" />
      </IntlProvider>
    );
    const mounted = mount(component);
    expect(mounted.children().length).toBe(1);
    expect(mounted.text()).toBe('1,001.001');
  });

  it('should format number with maximum decimal places', () => {
    const component = (
      <IntlProvider locale="en">
        <SanitizedFormattedNumber value="364.98653211" />
      </IntlProvider>
    );
    const mounted = mount(component);
    expect(mounted.children().length).toBe(1);
    expect(mounted.text()).toBe('364.98653211');
  });
});
