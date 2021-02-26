import React from 'react';
import { connect, Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';

import { FIRST_BLOCK } from 'containers/App/constants';

import BlockPagination from '../index';

import configureStore from '../../../configureStore';
import history from '../../../utils/history';

describe('<BlockPagination />', () => {
  const ReactComponent = () => <BlockPagination />;
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

  it('should render <BlockPagination />', () => {
    const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
    const component = shallow(<ConnectedComponent store={stateStore} />);
    expect(component.dive().props().state).toBe(expectedState);
  });

  it('renders given latest > block', () => {
    const props = {
      block: FIRST_BLOCK,
      latest: FIRST_BLOCK + 1,
    };

    const component = mount(
      <Provider store={store}>
        <BlockPagination {...props} />
      </Provider>,
    );
    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('renders given latest <= block', () => {
    const props = {
      block: FIRST_BLOCK,
      latest: FIRST_BLOCK,
    };

    const component = mount(
      <Provider store={store}>
        <BlockPagination {...props} />
      </Provider>,
    );
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
