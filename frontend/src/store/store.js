/**
 * Velora Global Centralized Redux Store
 */

import { authReducer, initialAuthState } from './authSlice';
import { uiReducer, initialUiState } from './uiSlice';
import { programsReducer, initialProgramsState } from './programsSlice';

// Combine all slice reducers
export function rootReducer(state = {}, action = {}) {
  return {
    auth: authReducer(state.auth || initialAuthState, action),
    ui: uiReducer(state.ui || initialUiState, action),
    programs: programsReducer(state.programs || initialProgramsState, action)
  };
}

// Create Redux Store
export function createReduxStore(reducer = rootReducer, initialState = {}) {
  let currentState = reducer(initialState, { type: '@@redux/INIT' });
  const listeners = new Set();

  return {
    getState() {
      return currentState;
    },

    dispatch(action) {
      if (typeof action === 'function') {
        return action(this.dispatch.bind(this), this.getState.bind(this));
      }
      currentState = reducer(currentState, action);
      listeners.forEach((listener) => listener());
      return action;
    },

    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    }
  };
}

export const store = createReduxStore(rootReducer);
