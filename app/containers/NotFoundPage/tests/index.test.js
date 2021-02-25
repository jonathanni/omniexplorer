/**
 * Testing the NotFoundPage
 */
import React from 'react';

import { FormattedMessage } from 'react-intl';

import { mountWithIntlStore } from 'tests/intl-enzyme-test-helper';

import NotFound from '../index';
import messages from '../messages';

describe('<NotFound />', () => {
  it('should render the Page Not Found text', () => {
    const renderedComponent = mountWithIntlStore(<NotFound />, messages);
    const expected = <FormattedMessage {...messages.header} />;
    expect(renderedComponent.contains(expected)).toEqual(true);
  });
});
