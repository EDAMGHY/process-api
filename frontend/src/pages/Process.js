import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthGlobalContext } from '../actions/auth';
import { useProcessStepGlobalContext } from '../actions/processStep';
import AddProcessStep from '../components/AddProcessStep';
import EditProcessStep from '../components/EditProcessStep';
function Process() {
  const { id } = useParams();

  const { processsteps, getAllProcessStep, deleteProcessStep } =
    useProcessStepGlobalContext();
  const { token } = useAuthGlobalContext();
  useEffect(() => {
    getAllProcessStep(id, token);
    console.log(processsteps);
  }, []);
  return (
    <div className='container my-5 border p-4'>
      <h2 className='border-bottom border-dark pb-4'>Process Step List</h2>
      <AddProcessStep token={token} idProcess={id} />
      <div className='d-flex w-100 align-items-center justify-content-start gap-4 my-3 flex-wrap'>
        {processsteps.length > 0 ? (
          processsteps.map((processstep) => {
            return (
              <>
                <div class='card' style={{ width: '18rem' }}>
                  <div class='card-body'>
                    <h5 class='card-title'>{processstep.process_stepId} </h5>
                    <h6 class='card-subtitle mb-2 text-muted'>
                      Title :{processstep.title}{' '}
                    </h6>
                    <p class='card-text'>Duration : {processstep.duration}</p>
                    <p class='card-text'>People : {processstep.people}</p>
                    <button
                      type='button'
                      class='btn text-secondary'
                      data-bs-toggle='modal'
                      data-bs-target='#exampleModalStepEdit'
                      data-bs-whatever='@mdo'
                    >
                      Edit
                    </button>
                    <EditProcessStep
                      processStepId={processstep.process_stepId}
                      idProcess={id}
                      token={token}
                    />

                    {/* <button class='btn text-secondary'>Edit</button> */}
                    <button
                      onClick={() =>
                        deleteProcessStep(processstep.process_stepId, id, token)
                      }
                      class='btn text-danger'
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <h2>You have not set any processes steps...</h2>
        )}
      </div>
    </div>
  );
}

export default Process;
