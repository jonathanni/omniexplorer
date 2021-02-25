/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */

import React from 'react';
import { createIntl, IntlProvider } from 'react-intl';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import PropTypes from 'prop-types';

/**
 * mock store
 */
const middlewares = [];
const mockStore = configureMockStore(middlewares);

/**
 * Default messages, it'll be used when messages is not given
 * You can pass your messages to the IntlProvider. Optional: remove if unneeded.
 */
const defaultMessages = require('../translations/en.json'); // en.json

/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
function nodeWithIntlProp(node, intl, store) {
  return React.cloneElement(node, {
    intl,
    store,
  });
}

function getIntlShape(messages = defaultMessages) {
  // Create the IntlProvider to retrieve context for wrapping around.
  const locale = 'en';
  const intl = createIntl({ locale, messages });

  return intl;
}

/**
 * Export these methods.
 */
export function mountWithIntl(node, msgs = defaultMessages) {
  const intl = getIntlShape(msgs);
  const store = mockStore();

  return mount(nodeWithIntlProp(node, intl), {
    context: {
      intl,
      store,
    },
    childContextTypes: {
      intl: PropTypes.object,
      store: PropTypes.object,
    },
  });
}

export function mountWithIntlStore(node, msgs = defaultMessages) {
  const intl = getIntlShape(msgs);
  const store = mockStore();

  const options = {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      locale: 'en',
    },
  };

  return mount(nodeWithIntlProp(node, intl, store), {
    context: {
      intl,
      store,
    },
    childContextTypes: {
      intl: PropTypes.object,
      store: PropTypes.object,
    },
    ...options,
  });
}

export function shallowWithIntl(node, msgs = defaultMessages) {
  const intl = getIntlShape(msgs);
  const store = mockStore();

  return shallow(nodeWithIntlProp(node), {
    context: {
      intl,
      store,
    },
  });
}
