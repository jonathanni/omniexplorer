import React from 'react';
import { connect } from 'react-redux';
import { shallow } from 'enzyme';

import BlockList from '../index';

describe('<BlockList />', () => {
  const ReactComponent = () => <BlockList />;
  it('should render <BlockList />', () => {
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
});
