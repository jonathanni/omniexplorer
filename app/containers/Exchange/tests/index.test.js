/**
 *
 * Tests for Exchange
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { shallow } from 'enzyme';
import { connect, Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import { Exchange } from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';
import configureStore from '../../../configureStore';
import history from '../../../utils/history';

describe('<Exchange />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();

    const initialState = {};
    const store = configureStore(initialState, history);

    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <Exchange dispatch={dispatch} />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  const ReactComponent = () => <Exchange />;
  it('should render <Exchange />', () => {
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
    const initialState = {};
    const store = configureStore(initialState, history);
    const dispatch = () => ({});

    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <Exchange dispatch={dispatch} />
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
