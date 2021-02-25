/**
 *
 * Tests for WarningTooltip
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import WarningTooltip from '../index';

describe('<WarningTooltip />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <div>
        <span id="example">tooltip</span>
        <WarningTooltip target="example" />
      </div>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  const ReactComponent = () => <WarningTooltip target="example" />;
  it('should render <WarningTooltip />', () => {
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

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <div>
        <span id="example">tooltip</span>
        <WarningTooltip target="example" />
      </div>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
