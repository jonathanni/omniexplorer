/**
 *
 * Tests for DExPairs
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

import DExPairs from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('<DExPairs />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <DExPairs />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  const ReactComponent = () => <DExPairs />;

  it('should render <DExPairs />', () => {
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
        <DExPairs />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
