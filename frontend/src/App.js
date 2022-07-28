import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from './components/Nav';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Process from './pages/Process';
import Register from './pages/Register';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthGlobalContext } from './actions/auth';
import EditProcess from './components/EditProcess';

function App() {
  const { getMe, dispatch, token } = useAuthGlobalContext();
  useEffect(() => {
    dispatch(getMe(token));
  }, [token]);
  const [idProcess, setIdProcess] = useState(null);
  return (
    <>
      <Router>
        <Navbar />
        <EditProcess token={token} processId={idProcess} />

        <Routes>
          <Route path='/' element={<Dashboard setIdProcess={setIdProcess} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/process/:id' element={<Process />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
