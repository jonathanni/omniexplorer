import React from 'react';
import { connect } from 'react-redux';
import { shallow } from 'enzyme';

import Ecosystem from '../index';

describe('<Ecosystem />', () => {
  const ReactComponent = () => <Ecosystem />;
  it('should render <Ecosystem />', () => {
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
