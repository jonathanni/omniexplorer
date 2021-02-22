import { loadActivations } from '../actions';
import { LOAD_ACTIVATIONS } from '../constants';

describe('Activations actions', () => {
  describe('Load Activations Action', () => {
    it('has a type of LOAD_ACTIVATIONS', () => {
      const expected = {
        type: LOAD_ACTIVATIONS,
      };
      expect(loadActivations()).toEqual(expected);
    });
  });
});
