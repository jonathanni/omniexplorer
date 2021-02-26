import React from 'react';
import { connect, Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { shallow, mount } from 'enzyme';

import LanguageProvider from 'containers/LanguageProvider/index';

import AssetLink from '../index';

import configureStore from '../../../configureStore';
import history from '../../../utils/history';

describe('<AssetLink />', () => {
  const ReactComponent = () => <AssetLink />;
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

  it('should render <AssetLink />', () => {
    const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
    const component = shallow(<ConnectedComponent store={stateStore} />);
    expect(component.dive().props().state).toBe(expectedState);
  });

  it('renders if asset is BTC', () => {
    const props = {
      asset: 0,
      basepath: '/asset',
    };

    const messages = {
      en: {},
    };

    const component = mount(
      <Provider store={store}>
        <LanguageProvider messages={messages}>
          <ConnectedRouter history={history}>
            <AssetLink {...props}>
              <span>test BTC</span>
            </AssetLink>
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('renders if asset is not BTC', () => {
    const props = {
      asset: 1,
      basepath: '/asset',
    };

    const messages = {
      en: {},
    };

    const component = mount(
      <Provider store={store}>
        <LanguageProvider messages={messages}>
          <ConnectedRouter history={history}>
            <AssetLink {...props}>
              <span>test non BTC</span>
            </AssetLink>
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
