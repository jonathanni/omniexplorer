import React from 'react';
import { connect, Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { shallow, mount } from 'enzyme';

import LanguageProvider from 'containers/LanguageProvider/index';

import WrapperLink from '../index';

import configureStore from '../../../configureStore';
import history from '../../../utils/history';

describe('<WrapperLink />', () => {
  const ReactComponent = () => <WrapperLink />;
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

  it('should render <WrapperLink />', () => {
    const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
    const component = shallow(<ConnectedComponent store={stateStore} />);
    expect(component.dive().props().state).toBe(expectedState);
  });

  it('renders and matches the snapshot', () => {
    const props = {};

    const messages = {
      en: {},
    };

    const component = mount(
      <Provider store={store}>
        <LanguageProvider messages={messages}>
          <ConnectedRouter history={history}>
            <WrapperLink {...props} />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
