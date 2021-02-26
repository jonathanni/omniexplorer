import React from 'react';
import { connect, Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';

import moment from 'moment/src/moment';

import ErrorBoundary from '../index';

import configureStore from '../../../configureStore';
import history from '../../../utils/history';

describe('<ErrorBoundary />', () => {
  const ReactComponent = () => <ErrorBoundary />;
  const expectedState = { mockedStated: true };
  const mapStateToProps = (state) => ({
    state,
  });
  const stateStore = {
    getState: () => expectedState,
    subscribe: () => ({}),
    dispatch: () => ({}),
  };

  const initialState = {};
  const store = configureStore(initialState, history);

  it('should render <ErrorBoundary />', () => {
    const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
    const component = shallow(<ConnectedComponent store={stateStore} />);
    expect(component.dive().props().state).toBe(expectedState);
  });

  it('renders if there is st error', () => {
    const props = {
      st: {
        error: 'test st error',
        modal: true,
      },
      cleanError: () => {},
    };

    const component = mount(
      <Provider store={store}>
        <ErrorBoundary {...props}>
          <span>test st</span>
        </ErrorBoundary>
      </Provider>,
    );
    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('renders if there is state error', () => {
    const props = {
      state: {
        error: 'test state error',
      },
      cleanError: () => {},
    };

    const component = mount(
      <Provider store={store}>
        <ErrorBoundary {...props}>
          <span>test state</span>
        </ErrorBoundary>
      </Provider>,
    );
    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('renders if there is no error and lastParsedDiff <= 10', () => {
    const props = {
      status: {
        last_parsed: moment.utc().format(),
      },
      cleanError: () => {},
    };

    const component = mount(
      <Provider store={store}>
        <ErrorBoundary {...props}>
          <span>test last_parsed now</span>
        </ErrorBoundary>
      </Provider>,
    );
    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('renders if there is no error and lastParsedDiff > 10', () => {
    const props = {
      status: {
        last_parsed: moment.utc().add(20, 'minutes').format(),
      },
      cleanError: () => {},
    };

    const component = mount(
      <Provider store={store}>
        <ErrorBoundary {...props}>
          <span>test last_parsed twenty</span>
        </ErrorBoundary>
      </Provider>,
    );
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
