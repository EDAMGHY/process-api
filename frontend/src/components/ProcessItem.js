import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthGlobalContext } from '../actions/auth';
import { useProcessGlobalContext } from '../actions/process';
import EditProcess from '../components/EditProcess';
function ProcessItem({ processId, title, description, setIdProcess }) {
  const { deleteProcess } = useProcessGlobalContext();
  const { token } = useAuthGlobalContext();
  return (
    <div class='card' style={{ width: '18rem' }}>
      <div class='card-body'>
        <h5 class='card-title'>{processId} </h5>
        <h6 class='card-subtitle mb-2 text-muted'>{title} </h6>
        <p class='card-text'>{description}</p>
        <button
          type='button'
          class='btn text-secondary'
          data-bs-toggle='modal'
          data-bs-target='#exampleModalEdit'
          data-bs-whatever='@mdo'
          onClick={() => setIdProcess(processId)}
        >
          Edit
        </button>

        {/* <button class='btn text-secondary'>Edit</button> */}
        <button
          onClick={() => deleteProcess(processId, token)}
          class='btn text-danger'
        >
          Delete
        </button>
        <Link to={`/process/${processId}`} class='card-link'>
          Details
        </Link>
      </div>
    </div>
  );
}

export default ProcessItem;
