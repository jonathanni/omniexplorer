import React from 'react';
import { connect } from 'react-redux';
import { shallow } from 'enzyme';

import Token from '../index';

describe('<Token />', () => {
  const ReactComponent = () => <Token />;
  it('should render <Token />', () => {
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
