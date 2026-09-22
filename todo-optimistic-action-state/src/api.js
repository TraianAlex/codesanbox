
let listeners = [];
let state = {
  requests: [],
  settings: { delay: 750, randomize: false, error: false }
};

function notify() {
  listeners.forEach(l => l());
}

export function subscribe(listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
}

export function getSnapshot() {
  return state;
}

export function updateSettings(newSettings) {
  state = { ...state, settings: { ...state.settings, ...newSettings } };
  notify();
}

export async function updateTodo(id, newTodo) {
  const reqId = Math.random().toString(36).substr(2, 9);
  const duration = state.settings.randomize 
    ? state.settings.delay + (Math.random() * 2000) 
    : state.settings.delay;
  
  state = {
    ...state,
    requests: [...state.requests, { 
      id: reqId, 
      path: `/todos/${id}`, 
      duration 
    }]
  };
  notify();

  await new Promise(resolve => setTimeout(resolve, duration));

  state = {
    ...state,
    requests: state.requests.filter(r => r.id !== reqId)
  };
  notify();

  if (state.settings.error) {
    throw new Error("Simulated API Error")
  }

  return newTodo;
}

export async function toggleLike(liked) {
  const reqId = Math.random().toString(36).substr(2, 9);
  const duration = state.settings.randomize 
    ? state.settings.delay + (Math.random() * 2000) 
    : state.settings.delay;
  
  state = {
    ...state,
    requests: [...state.requests, { 
      id: reqId, 
      path: '/likes', 
      duration 
    }]
  };
  notify();

  await new Promise(resolve => setTimeout(resolve, duration));

  state = {
    ...state,
    requests: state.requests.filter(r => r.id !== reqId)
  };
  notify();

  if (state.settings.error) {
    throw new Error("Simulated API Error")
  }

  return liked;
}