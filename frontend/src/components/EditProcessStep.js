import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useProcessStepGlobalContext } from '../actions/processStep';

function EditProcessStep({ token, processStepId, idProcess }) {
  const {
    updateProcessStep,
    getProcessStep,
    processstep,
    msg,
    dispatch,
    isLoading,
  } = useProcessStepGlobalContext();
  const [formData, setFormData] = useState({
    title: '',
    people: '',
    duration: '',
  });
  const navigate = useNavigate();
  const { title, duration, people } = formData;
  useEffect(() => {
    if (msg) {
      toast.error(msg);
    }
    if (processStepId) {
      getProcessStep(processStepId, idProcess, token);
    }
    // if (process.title) formData.title = process.title;
    // if (process.description) formData.description = process.description;

    // dispatch(reset());
  }, [msg, dispatch, processStepId, +idProcess]);

  const onChange = (e) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const onSubmit = (e) => {
    e.preventDefault();
    updateProcessStep(
      { title, duration, people },
      idProcess,
      processstep.process_stepId,
      token
    );
  };
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <div
        class='modal fade'
        id='exampleModalStepEdit'
        tabindex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div class='modal-dialog'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h5 class='modal-title' id='exampleModalLabel'>
                Edit Process Step
              </h5>
              <button
                type='button'
                class='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div class='modal-body'>
              <form>
                <div class='mb-3'>
                  <label for='recipient-name' class='col-form-label'>
                    title
                  </label>
                  <input
                    type='text'
                    class='form-control'
                    id='recipient-name'
                    name='title'
                    value={title}
                    onChange={onChange}
                  />
                </div>
                <div class='mb-3'>
                  <label for='recipient-name' class='col-form-label'>
                    people
                  </label>
                  <input
                    type='text'
                    class='form-control'
                    id='recipient-name'
                    name='people'
                    value={people}
                    onChange={onChange}
                  />
                </div>
                <div class='mb-3'>
                  <label for='message-text' class='col-form-label'>
                    duration
                  </label>
                  <textarea
                    value={duration}
                    class='form-control'
                    id='message-text'
                    name='duration'
                    onChange={onChange}
                  ></textarea>
                </div>
              </form>
            </div>
            <div class='modal-footer'>
              <button
                type='button'
                class='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>
              <button
                onClick={onSubmit}
                type='button'
                data-bs-dismiss='modal'
                class='btn btn-primary'
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProcessStep;
