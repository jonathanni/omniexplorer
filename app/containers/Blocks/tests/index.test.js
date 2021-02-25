import React from 'react';
import { connect } from 'react-redux';
import { shallow } from 'enzyme';

import { Blocks } from '../index';

describe('<Blocks />', () => {
  const ReactComponent = () => <Blocks />;
  it('should render <Blocks />', () => {
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
