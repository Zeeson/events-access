export default (state, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
