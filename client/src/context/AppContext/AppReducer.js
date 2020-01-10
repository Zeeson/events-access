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
        workers: []
      };
    default:
      return state;
  }
};
