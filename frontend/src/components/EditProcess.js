import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProcessGlobalContext } from '../actions/process';
import { toast } from 'react-toastify';

function EditProcess({ token, processId }) {
  const { updateProcess, getProcess, process, msg, dispatch, isLoading } =
    useProcessGlobalContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const navigate = useNavigate();
  const { title, description } = formData;
  useEffect(() => {
    if (msg) {
      toast.error(msg);
    }
    if (processId) {
      getProcess(processId, token);
    }

    // if (process.title) formData.title = process.title;
    // if (process.description) formData.description = process.description;

    // dispatch(reset());
  }, [msg, dispatch, processId]);

  const onChange = (e) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const onSubmit = (e) => {
    e.preventDefault();
    updateProcess({ title, description }, process.processId, token);
    navigate('/');
  };
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <div
        class='modal fade'
        id='exampleModalEdit'
        tabindex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div class='modal-dialog'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h5 class='modal-title' id='exampleModalLabel'>
                Edit Process
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
                  <label for='message-text' class='col-form-label'>
                    description
                  </label>
                  <textarea
                    value={description}
                    class='form-control'
                    id='message-text'
                    name='description'
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

export default EditProcess;
