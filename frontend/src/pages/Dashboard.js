import React from 'react';
import { Link } from 'react-router-dom';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthGlobalContext } from '../actions/auth';
import { useProcessGlobalContext } from '../actions/process';

import ProcessItem from '../components/ProcessItem';
import AddProcess from '../components/AddProcess';

function Dashboard({ setIdProcess }) {
  const { user, isAuthenticated, token } = useAuthGlobalContext();
  const { processes, getAllProcess } = useProcessGlobalContext();
  useEffect(() => {
    getAllProcess(token);
  }, []);
  return (
    <div>
      <div className='container my-5'>
        <h2>
          Welcome back{' '}
          {user && isAuthenticated
            ? `${user.firstName} ${user.lastName}`
            : 'Unknown'}{' '}
        </h2>
        <div className='my-3 border rounded p-3'>
          <h4>Process List</h4>
          <AddProcess token={token} />
          <div className='d-flex w-100 align-items-center justify-content-start gap-4 my-3 flex-wrap'>
            {processes.length > 0 ? (
              processes.map((process) => {
                return <ProcessItem {...process} setIdProcess={setIdProcess} />;
              })
            ) : (
              <h2>You have not set any processes...</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
