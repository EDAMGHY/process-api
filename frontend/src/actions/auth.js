import axios from 'axios';
import React, { useContext, useReducer } from 'react';
import authReducer from '../reducers/auth';
const AuthContext = React.createContext();

const initialState = {
  token: localStorage.getItem('processToken'),
  user: null,
  isAuthenticated: null,
  loading: true,
  msg: null,
};

const API_URL = 'http://localhost:5000/api/v1/auth/';
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const register = async ({ username, lastName, firstName, password }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify({ username, lastName, firstName, password });
      const res = await axios.post(API_URL + 'register', body, config);
      console.log('register', res.data);
      dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
    } catch (err) {
      console.log(err.response.data.message);
      dispatch({ type: 'REGISTER_FAIL', payload: err.response.data.message });
    }
  };
  const login = async ({ username, password }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify({ username, password });
      const res = await axios.post(API_URL + 'login', body, config);
      console.log('login', res.data);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'LOGIN_FAIL', payload: err.response.data.message });
    }
  };
  const getMe = async (token) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(API_URL, config);
      console.log('get Me', res.data);
      dispatch({ type: 'LOAD_USER', payload: res.data });
    } catch (err) {
      dispatch({ type: 'LOAD_FAIL', payload: err.response.data.message });
    }
  };
  const logout = async () => {
    dispatch({ type: 'LOGOUT' });
  };
  const reset = async () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        register,
        login,
        logout,
        reset,
        getMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
// custom hook
export const useAuthGlobalContext = () => {
  return useContext(AuthContext);
};
export { AuthContext, AuthProvider };
