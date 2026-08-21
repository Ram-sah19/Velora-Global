/**
 * Velora Global Redux UI Slice
 */

export const initialUiState = {
  activeTab: 'home',
  isOffline: typeof navigator !== 'undefined' ? !navigator.onLine : false,
  activeModal: null, // 'auth', 'client-auth', 'phone-otp', etc.
  modalPayload: null,
  toasts: []
};

// Action Types
export const UI_ACTIONS = {
  SET_ACTIVE_TAB: 'ui/setActiveTab',
  SET_OFFLINE: 'ui/setOffline',
  OPEN_MODAL: 'ui/openModal',
  CLOSE_MODAL: 'ui/closeModal',
  ADD_TOAST: 'ui/addToast',
  REMOVE_TOAST: 'ui/removeToast'
};

// Action Creators
export const setActiveTab = (tab) => ({ type: UI_ACTIONS.SET_ACTIVE_TAB, payload: tab });
export const setOffline = (isOffline) => ({ type: UI_ACTIONS.SET_OFFLINE, payload: isOffline });
export const openModal = (modalName, payload = null) => ({ 
  type: UI_ACTIONS.OPEN_MODAL, 
  payload: { modalName, payload } 
});
export const closeModal = () => ({ type: UI_ACTIONS.CLOSE_MODAL });
export const addToast = (toast) => ({ type: UI_ACTIONS.ADD_TOAST, payload: toast });
export const removeToast = (id) => ({ type: UI_ACTIONS.REMOVE_TOAST, payload: id });

// Reducer
export function uiReducer(state = initialUiState, action) {
  switch (action.type) {
    case UI_ACTIONS.SET_ACTIVE_TAB:
      return { ...state, activeTab: action.payload };

    case UI_ACTIONS.SET_OFFLINE:
      return { ...state, isOffline: action.payload };

    case UI_ACTIONS.OPEN_MODAL:
      return { 
        ...state, 
        activeModal: action.payload.modalName, 
        modalPayload: action.payload.payload 
      };

    case UI_ACTIONS.CLOSE_MODAL:
      return { ...state, activeModal: null, modalPayload: null };

    case UI_ACTIONS.ADD_TOAST:
      return { 
        ...state, 
        toasts: [...state.toasts, { ...action.payload, id: Date.now() + Math.random() }] 
      };

    case UI_ACTIONS.REMOVE_TOAST:
      return { 
        ...state, 
        toasts: state.toasts.filter(t => t.id !== action.payload) 
      };

    default:
      return state;
  }
}
