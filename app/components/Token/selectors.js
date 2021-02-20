import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the blockDetail state domain
 */
const selectTokenDomain = (state) => state.token || initialState;

/**
 * Other specific selectors
 */
export const getProperties = (state) => state.token;
export const getTokens = (state) => state.token.tokens;

/**
 * Default selector used by BlockDetail
 */

const makeSelectProperties = () =>
  createSelector(selectTokenDomain, (substate) => substate.tokens);

/* eslint-disable no-unused-vars */
/* eslint no-shadow: ["error", { "allow": ["id"] }] */
const makeSelectProperty = (id) =>
  createSelector([selectTokenDomain], (substate, id) => substate.tokens[id]);
/* eslint-enable no-unused-vars */

const makeSelectLoading = () =>
  createSelector(selectTokenDomain, (substate) => substate.isFetching);

const makeSelectLastFetched = () =>
  createSelector(selectTokenDomain, (substate) => substate.lastFetched);

const makeSelectHasProperty = (id) =>
  createSelector(selectTokenDomain, (substate) => !!substate.tokens[id]);

export {
  selectTokenDomain,
  makeSelectProperties,
  makeSelectProperty,
  makeSelectLoading,
  makeSelectHasProperty,
  makeSelectLastFetched,
};
