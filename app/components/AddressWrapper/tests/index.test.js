/**
 *
 * Tests for AddressWrapper
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import AddressWrapper from '../index';

describe('<AddressWrapper />', () => {
  const ReactComponent = () => <AddressWrapper />;
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
    render(<AddressWrapper />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should render <AddressWrapper />', () => {
    const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
    const component = shallow(<ConnectedComponent store={stateStore} />);
    expect(component.dive().props().state).toBe(expectedState);
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<AddressWrapper />);
    expect(firstChild).toMatchSnapshot();
  });
});
