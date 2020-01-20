export default (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'CLIENTS':
      return {
        ...state,
        clients: action.payload
      };
    case 'WORKERS':
      return {
        ...state,
        workers: action.payload
      };
    case 'CLEARSTATE':
      return {
        ...state,
        clients: [],
        workers: [],
        filtered: []
      };
    case 'FILTERWORKERS':
      return {
        ...state,
        filtered: action.payload
      };
    case 'FILTER':
      return {
        ...state,
        filter: action.payload
      };
    case 'CLEAR_CURRENT':
      return {
        ...state,
        current: action.payload
      };
    default:
      return state;
  }
};
