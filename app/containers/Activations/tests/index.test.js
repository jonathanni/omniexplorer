import React from 'react';
import { connect, Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { shallow, mount } from 'enzyme';

import { Container } from 'reactstrap';
import LoadingIndicator from 'components/LoadingIndicator';
import LanguageProvider from 'containers/LanguageProvider/index';

import { Activations } from '../index';
import { loadActivations } from '../actions';

import configureStore from '../../../configureStore';
import history from '../../../utils/history';

describe('<Activations />', () => {
  const ReactComponent = () => <Activations />;
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

  it('should render <Activations />', () => {
    const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
    const component = shallow(<ConnectedComponent store={stateStore} />);
    expect(component.dive().props().state).toBe(expectedState);
  });

  it('renders and is still loading', () => {
    const props = {
      activations: {
        loading: true,
        list: [],
      },
      state: {},
      dispatch: () => {},
      loadActivations,
    };

    const loading = (
      <Container>
        <LoadingIndicator />
      </Container>
    );

    const component = mount(
      <Provider store={store}>
        <Activations {...props} />
      </Provider>,
    );
    expect(component.contains(loading)).toBeTruthy();
    component.unmount();
  });

  it('renders and matches the snapshot', () => {
    const activation = {
      featureid: 1,
      featurename: 'Class C transaction encoding',
      activationblock: 395000,
      minimumversion: 1000000,
      txhash:
        'e67a0550848b7932d7796aeea16ab0e48a5cfe81c4e8cca2c5b03e0416850114',
    };

    const props = {
      activations: {
        loading: false,
        list: [activation],
      },
      state: {},
      dispatch: () => {},
      loadActivations,
    };

    const messages = {
      en: {},
    };

    const div = document.createElement('div');
    div.setAttribute('id', 'h-c5b03e0416850114');
    document.body.appendChild(div);

    const component = mount(
      <Provider store={store}>
        <LanguageProvider messages={messages}>
          <ConnectedRouter history={history}>
            <Activations {...props} />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
    );

    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
