import axios from 'axios';
import React, { useContext, useReducer } from 'react';
import processStepReducer from '../reducers/processStep';
const ProcessStepContext = React.createContext();

const initialState = {
  processsteps: [],
  processstep: {},
  loading: true,
  msg: null,
};

const API_URL = 'http://localhost:5000/api/v1/process-step/';
const ProcessStepProvider = ({ children }) => {
  const [state, dispatch] = useReducer(processStepReducer, initialState);
  const getAllProcessStep = async (idProcess, token) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(API_URL + idProcess, config);
      console.log('processSteps', res.data);
      dispatch({ type: 'PROCESSSTEPS_SUCCESS', payload: res.data });
    } catch (err) {
      console.log(err.response.data.message);
      dispatch({
        type: 'PROCESSSTEPS_FAIL',
        payload: err.response.data.message,
      });
    }
  };
  const createProcessStep = async (
    { title, duration, people },
    idProcess,
    token
  ) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const body = JSON.stringify({ title, duration, people });
      const res = await axios.post(API_URL + idProcess, body, config);
      console.log('create processStep', res.data);
      dispatch({ type: 'ADD_PROCESSSTEP', payload: res.data });
    } catch (err) {
      console.log(err.response.data.message);
      dispatch({
        type: 'ADD_PROCESSSTEP_FAIL',
        payload: err.response.data.message,
      });
    }
  };
  const updateProcessStep = async (
    { title, duration, people },
    idProcess,
    id,
    token
  ) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const body = JSON.stringify({ title, duration, people });
      const res = await axios.put(API_URL + id + '/' + idProcess, body, config);
      console.log('update processStep', res.data);
      dispatch({ type: 'UPDATE_PROCESSSTEP', payload: res.data });
    } catch (err) {
      console.log(err.response.data.message);
      dispatch({
        type: 'UPDATE_PROCESSSTEP_FAIL',
        payload: err.response.data.message,
      });
    }
  };
  const deleteProcessStep = async (id, idProcess, token) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.delete(API_URL + id + '/' + idProcess, config);
      console.log('create processStep', res.data);
      dispatch({ type: 'DELETE_PROCESSSTEP', payload: id });
    } catch (err) {
      console.log(err.response.data.message);
      dispatch({
        type: 'DELETE_PROCESSSTEP_FAIL',
        payload: err.response.data.message,
      });
    }
  };
  const getProcessStep = async (id, idProcess, token) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(API_URL + id + '/' + idProcess, config);
      console.log('get processStep', res.data);
      dispatch({ type: 'GET_PROCESSSTEP', payload: res.data });
    } catch (err) {
      console.log(err.response.data.message);
      dispatch({
        type: 'GET_PROCESSSTEP_FAIL',
        payload: err.response.data.message,
      });
    }
  };
  //   const reset = () => {
  //     dispatch({ type: 'RESET' });
  //   };

  return (
    <ProcessStepContext.Provider
      value={{
        ...state,
        dispatch,
        getAllProcessStep,
        createProcessStep,
        deleteProcessStep,
        getProcessStep,
        updateProcessStep,
      }}
    >
      {children}
    </ProcessStepContext.Provider>
  );
};
// custom hook
export const useProcessStepGlobalContext = () => {
  return useContext(ProcessStepContext);
};
export { ProcessStepContext, ProcessStepProvider };
