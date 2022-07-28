import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthGlobalContext } from '../actions/auth';
import { useProcessStepGlobalContext } from '../actions/processStep';

function AddProcessStep({ token, idProcess }) {
  const { createProcessStep, msg, dispatch, isLoading } =
    useProcessStepGlobalContext();
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
    // dispatch(reset());
  }, [msg, dispatch]);
  const onChange = (e) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const onSubmit = (e) => {
    e.preventDefault();
    createProcessStep({ title, duration, people }, idProcess, token);
  };
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <button
        type='button'
        class='btn btn-primary'
        data-bs-toggle='modal'
        data-bs-target='#exampleModalStep'
        data-bs-whatever='@mdo'
      >
        Add Process
      </button>

      <div
        class='modal fade'
        id='exampleModalStep'
        tabindex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div class='modal-dialog'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h5 class='modal-title' id='exampleModalLabel'>
                Add Process Step
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
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProcessStep;
