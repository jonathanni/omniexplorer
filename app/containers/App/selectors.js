import { createSelector } from 'reselect';
import { initialState } from './reducers';

const selectGlobal = (state) => state.global || initialState;
const selectRoute = (state) => state.route;

const makeSelectLocation = () =>
  createSelector(selectRoute, (routeState) => routeState.location);
const makeSelectLoading = () =>
  createSelector(selectGlobal, (globalState) => globalState.loading);

const makeSelectError = () =>
  createSelector(selectGlobal, (globalState) => globalState.error);

export { makeSelectLocation, makeSelectLoading, makeSelectError };
