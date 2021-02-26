import React from 'react';
import { connect, Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';

import { EXTERNAL_EXPLORER_BLOCKCHAIR } from '../constants';

import ExplorerLink from '../index';

import configureStore from '../../../configureStore';
import history from '../../../utils/history';

describe('<ExplorerLink />', () => {
  const ReactComponent = () => <ExplorerLink />;
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

  it('should render <ExplorerLink />', () => {
    const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
    const component = shallow(<ConnectedComponent store={stateStore} />);
    expect(component.dive().props().state).toBe(expectedState);
  });

  it('renders and matches the snapshot', () => {
    const props = {
      explorerId: EXTERNAL_EXPLORER_BLOCKCHAIR,
      tx: 'e67a0550848b7932d7796aeea16ab0e48a5cfe81c4e8cca2c5b03e0416850114',
      className: 'test',
    };

    const component = mount(
      <Provider store={store}>
        <ExplorerLink {...props} />
      </Provider>,
    );
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
