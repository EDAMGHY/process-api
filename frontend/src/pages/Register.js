import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuthGlobalContext } from '../actions/auth';

function Register() {
  const { register, reset, isLoading, dispatch, user, isAuthenticated, msg } =
    useAuthGlobalContext();

  const [formData, setFormData] = useState({
    username: '',
    lastName: '',
    firstName: '',
    password: '',
  });

  const { username, lastName, firstName, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    register({ username, lastName, firstName, password });
  };
  useEffect(() => {
    if (msg) {
      toast.error(msg);
    }

    if (isAuthenticated || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [msg, isLoading, navigate, isAuthenticated, user]);

  if (isLoading) {
    return <h2 className='text-center'>Loading...</h2>;
  }

  return (
    <main
      className='form-signin w-100 d-flex justify-content-center  align-items-center'
      style={{ height: 'calc(100vh - 60px)' }}
    >
      <form onSubmit={onSubmit}>
        <h1 className='h3 mb-3 fw-normal'>Register</h1>

        <div className='form-floating'>
          <input
            type='text'
            name='firstName'
            className='form-control'
            id='floatingInput'
            placeholder='firstName'
            value={firstName}
            onChange={onChange}
          />
          <label htmlFor='floatingInput'>First Name</label>
        </div>

        <div className='form-floating'>
          <input
            type='text'
            name='lastName'
            className='form-control'
            id='floatingInput'
            placeholder='lastName'
            value={lastName}
            onChange={onChange}
          />
          <label htmlFor='floatingInput'>Last Name</label>
        </div>

        <div className='form-floating'>
          <input
            type='text'
            name='username'
            className='form-control'
            id='floatingInput'
            placeholder='username'
            value={username}
            onChange={onChange}
          />
          <label htmlFor='floatingInput'>Username</label>
        </div>
        <div className='form-floating'>
          <input
            type='password'
            name='password'
            className='form-control'
            id='floatingPassword'
            placeholder='Password'
            value={password}
            onChange={onChange}
          />
          <label htmlFor='floatingPassword'>Password</label>
        </div>

        <button className='w-100 btn btn-lg btn-primary' type='submit'>
          Register
        </button>
        <p className='mt-5 mb-3 text-muted'>
          Already have an account? <Link to='/login'>Login</Link>
        </p>
      </form>
    </main>
  );
}

export default Register;
