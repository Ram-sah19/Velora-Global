/**
 * Velora Global Redux Auth Slice
 */

// Initial state loaded from localStorage if present (Persistent Auth)
const savedUser = (() => {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
})();

const savedToken = localStorage.getItem('token') || null;

export const initialAuthState = {
  currentUser: savedUser,
  token: savedToken,
  isAuthenticated: !!savedUser,
  loading: false,
  error: null
};

// Action Types
export const AUTH_ACTIONS = {
  LOGIN_START: 'auth/loginStart',
  LOGIN_SUCCESS: 'auth/loginSuccess',
  LOGIN_FAILURE: 'auth/loginFailure',
  LOGOUT: 'auth/logout',
  UPDATE_PROFILE: 'auth/updateProfile'
};

// Action Creators
export const loginStart = () => ({ type: AUTH_ACTIONS.LOGIN_START });
export const loginSuccess = (user, token) => ({ 
  type: AUTH_ACTIONS.LOGIN_SUCCESS, 
  payload: { user, token } 
});
export const loginFailure = (error) => ({ 
  type: AUTH_ACTIONS.LOGIN_FAILURE, 
  payload: error 
});
export const logout = () => ({ type: AUTH_ACTIONS.LOGOUT });
export const updateProfile = (updatedFields) => ({ 
  type: AUTH_ACTIONS.UPDATE_PROFILE, 
  payload: updatedFields 
});

// Reducer
export function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return { ...state, loading: true, error: null };

    case AUTH_ACTIONS.LOGIN_SUCCESS: {
      const { user, token } = action.payload;
      try {
        localStorage.setItem('user', JSON.stringify(user));
        if (token) localStorage.setItem('token', token);
      } catch (e) {}
      return {
        ...state,
        currentUser: user,
        token: token || state.token,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    }

    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case AUTH_ACTIONS.LOGOUT:
      try {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } catch (e) {}
      return {
        ...state,
        currentUser: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };

    case AUTH_ACTIONS.UPDATE_PROFILE: {
      const updated = { ...state.currentUser, ...action.payload };
      try {
        localStorage.setItem('user', JSON.stringify(updated));
      } catch (e) {}
      return {
        ...state,
        currentUser: updated
      };
    }

    default:
      return state;
  }
}
