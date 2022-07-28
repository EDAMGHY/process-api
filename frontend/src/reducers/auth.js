function authReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      localStorage.setItem('processToken', payload.token);
      return {
        ...state,
        ...payload,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOAD_USER':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case 'REGISTER_FAIL':
    case 'LOGIN_FAIL':
      localStorage.removeItem('processToken');
      return {
        ...state,
        msg: payload,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'LOGOUT':
      localStorage.removeItem('processToken');
      return {
        ...state,
        msg: 'User Logged Out',
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'RESET':
      return {
        ...state,
        msg: null,
      };
    default:
      return state;
  }
}
export default authReducer;
