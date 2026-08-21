/**
 * Velora Global Redux Store Provider & React Hooks
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { store } from './store';

export * from './authSlice';
export * from './uiSlice';
export * from './programsSlice';
export { store };

const ReduxContext = createContext(store);

/**
 * Global Store Provider Component
 */
export function StoreProvider({ children, customStore = store }) {
  return (
    <ReduxContext.Provider value={customStore}>
      {children}
    </ReduxContext.Provider>
  );
}

/**
 * Redux useSelector Hook
 * Subscribes to store updates and returns selected state slice
 */
export function useSelector(selector) {
  const currentStore = useContext(ReduxContext) || store;
  const [selectedState, setSelectedState] = useState(() => selector(currentStore.getState()));

  useEffect(() => {
    const unsubscribe = currentStore.subscribe(() => {
      const nextSelectedState = selector(currentStore.getState());
      setSelectedState((prev) => {
        if (prev === nextSelectedState) return prev;
        return nextSelectedState;
      });
    });
    return unsubscribe;
  }, [currentStore, selector]);

  return selectedState;
}

/**
 * Redux useDispatch Hook
 * Returns store dispatch function
 */
export function useDispatch() {
  const currentStore = useContext(ReduxContext) || store;
  return currentStore.dispatch.bind(currentStore);
}

/**
 * Redux useStore Hook
 * Returns full store instance
 */
export function useStore() {
  return useContext(ReduxContext) || store;
}
