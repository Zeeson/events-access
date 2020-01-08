export default (state, action) => {
  switch (action.type) {
    case 'OUT':
      localStorage.removeItem('auth');
      return {
        ...state,
        auth: false,
        user: null
      };
    case 'USER':
      return {
        ...state,
        user: action.payload,
        auth: true,
        admin: action.payload.admin
      };
    case 'SETTOKEN':
      localStorage.setItem('auth', action.payload);
      return {
        ...state,
        auth: true
      };
    // case 'TOKENEXIST':
    //   return {
    //     ...state,
    //     auth: true
    //   };
    default:
      return state;
  }
};
