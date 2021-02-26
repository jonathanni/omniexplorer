/**
 *
 * Tests for StyledIconCopy
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import StyledIconCopy from '../index';

describe('<StyledIconCopy />', () => {
  const ReactComponent = () => <StyledIconCopy />;
  const expectedState = { mockedStated: true };
  const mapStateToProps = (state) => ({
    state,
  });
  const stateStore = {
    getState: () => expectedState,
    subscribe: () => ({}),
    dispatch: () => ({}),
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<StyledIconCopy />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should render <StyledIconCopy />', () => {
    const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
    const component = shallow(<ConnectedComponent store={stateStore} />);
    expect(component.dive().props().state).toBe(expectedState);
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<StyledIconCopy />);
    expect(firstChild).toMatchSnapshot();
  });
});
