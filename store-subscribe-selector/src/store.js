import { useState, useEffect, useSyncExternalStore } from "react";

export const createStore = (initialState) => {
  let currentState = initialState;
  const listeners = new Set();
  return {
    getState: () => currentState,
    setState: (newState) => {
      currentState = newState;
      listeners.forEach((listener) => listener(currentState));
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
};

export const useStore1 = (store, selector = (state) => state) => {
  const [state, setState] = useState(selector(store.getState()));

  useEffect(() => store.subscribe((state) => setState(selector(state))), [
    selector,
    store
  ]);

  return state;
};

export const useStore = (store, selector = (state) => state) =>
  useSyncExternalStore(store.subscribe, () => selector(store.getState()));
