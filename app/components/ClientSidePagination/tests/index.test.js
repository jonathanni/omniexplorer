import React from 'react';
import { connect, Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';

import ClientSidePagination from '../index';

import configureStore from '../../../configureStore';
import history from '../../../utils/history';

describe('<ClientSidePagination />', () => {
  const ReactComponent = () => <ClientSidePagination />;
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

  it('should render <ClientSidePagination />', () => {
    const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
    const component = shallow(<ConnectedComponent store={stateStore} />);
    expect(component.dive().props().state).toBe(expectedState);
  });

  it('renders if latest > idx', () => {
    const props = {
      idx: 1,
      latest: 2,
      base: 'test-base',
    };

    const component = mount(
      <Provider store={store}>
        <ClientSidePagination {...props} />
      </Provider>,
    );
    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('renders if latest <= idx', () => {
    const props = {
      idx: 1,
      latest: 1,
      base: 'test-base',
    };

    const component = mount(
      <Provider store={store}>
        <ClientSidePagination {...props} />
      </Provider>,
    );
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
