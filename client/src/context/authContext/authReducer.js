export default (state, action) => {
  switch (action.type) {
    case 'SETTOKEN':
      localStorage.setItem('auth', action.payload);
      return {
        ...state,
        auth: true,
        token: action.payload
      };
    case 'OUT':
      localStorage.removeItem('auth');
      return {
        ...state,
        auth: false,
        user: null,
        admin: null,
        token: null
      };
    case 'USER':
      // localStorage.setItem('auth', action.payload);
      return {
        ...state,
        user: action.payload,
        auth: true,
        loading: false,
        admin: action.payload.admin,
        token: localStorage.auth
      };
    case 'SETLOADING':
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};
