import axios from 'axios';
import React, { useContext, useReducer } from 'react';
import processReducer from '../reducers/process';
const ProcessContext = React.createContext();

const initialState = {
  processes: [],
  process: {},
  loading: true,
  msg: null,
};

const API_URL = 'http://localhost:5000/api/v1/process/';
const ProcessProvider = ({ children }) => {
  const [state, dispatch] = useReducer(processReducer, initialState);
  const getAllProcess = async (token) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(API_URL, config);
      console.log('processes', res.data);
      dispatch({ type: 'PROCESSES_SUCCESS', payload: res.data });
    } catch (err) {
      console.log(err.response.data.message);
      dispatch({ type: 'PROCESSES_FAIL', payload: err.response.data.message });
    }
  };
  const createProcess = async ({ title, description }, token) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const body = JSON.stringify({ title, description });
      const res = await axios.post(API_URL, body, config);
      console.log('create process', res.data);
      dispatch({ type: 'ADD_PROCESS', payload: res.data });
    } catch (err) {
      console.log(err.response.data.message);
      dispatch({
        type: 'ADD_PROCESS_FAIL',
        payload: err.response.data.message,
      });
    }
  };
  const updateProcess = async ({ title, description }, id, token) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const body = JSON.stringify({ title, description });
      const res = await axios.put(API_URL + id, body, config);
      console.log('create process', res.data);
      dispatch({ type: 'UPDATE_PROCESS', payload: res.data });
    } catch (err) {
      console.log(err.response.data.message);
      dispatch({
        type: 'UPDATE_PROCESS_FAIL',
        payload: err.response.data.message,
      });
    }
  };
  const deleteProcess = async (id, token) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.delete(API_URL + id, config);
      console.log('create process', res.data);
      dispatch({ type: 'DELETE_PROCESS', payload: id });
    } catch (err) {
      console.log(err.response.data.message);
      dispatch({
        type: 'DELETE_PROCESS_FAIL',
        payload: err.response.data.message,
      });
    }
  };
  const getProcess = async (id, token) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(API_URL + id, config);
      console.log('get process', res.data);
      dispatch({ type: 'GET_PROCESS', payload: res.data });
    } catch (err) {
      console.log(err.response.data.message);
      dispatch({
        type: 'GET_PROCESS_FAIL',
        payload: err.response.data.message,
      });
    }
  };
  //   const reset = () => {
  //     dispatch({ type: 'RESET' });
  //   };

  return (
    <ProcessContext.Provider
      value={{
        ...state,
        dispatch,
        getAllProcess,
        createProcess,
        deleteProcess,
        getProcess,
        updateProcess,
      }}
    >
      {children}
    </ProcessContext.Provider>
  );
};
// custom hook
export const useProcessGlobalContext = () => {
  return useContext(ProcessContext);
};
export { ProcessContext, ProcessProvider };
