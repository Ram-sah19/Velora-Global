/**
 * Velora Global Redux Programs Slice
 */

export const initialProgramsState = {
  catalog: [],
  selectedDomain: 'All',
  searchQuery: '',
  loading: false,
  error: null
};

// Action Types
export const PROGRAMS_ACTIONS = {
  SET_PROGRAMS: 'programs/setPrograms',
  SET_SELECTED_DOMAIN: 'programs/setSelectedDomain',
  SET_SEARCH_QUERY: 'programs/setSearchQuery',
  SET_LOADING: 'programs/setLoading',
  SET_ERROR: 'programs/setError'
};

// Action Creators
export const setPrograms = (programs) => ({ type: PROGRAMS_ACTIONS.SET_PROGRAMS, payload: programs });
export const setSelectedDomain = (domain) => ({ type: PROGRAMS_ACTIONS.SET_SELECTED_DOMAIN, payload: domain });
export const setSearchQuery = (query) => ({ type: PROGRAMS_ACTIONS.SET_SEARCH_QUERY, payload: query });
export const setProgramsLoading = (loading) => ({ type: PROGRAMS_ACTIONS.SET_LOADING, payload: loading });
export const setProgramsError = (error) => ({ type: PROGRAMS_ACTIONS.SET_ERROR, payload: error });

// Reducer
export function programsReducer(state = initialProgramsState, action) {
  switch (action.type) {
    case PROGRAMS_ACTIONS.SET_PROGRAMS:
      return { ...state, catalog: action.payload, loading: false, error: null };

    case PROGRAMS_ACTIONS.SET_SELECTED_DOMAIN:
      return { ...state, selectedDomain: action.payload };

    case PROGRAMS_ACTIONS.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };

    case PROGRAMS_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };

    case PROGRAMS_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
}
