import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthGlobalContext } from '../actions/auth';

function Login() {
  const { reset, login, dispatch, msg, isAuthenticated, user, isLoading } =
    useAuthGlobalContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const onSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
  };
  useEffect(() => {
    if (msg) {
      toast.error(msg);
    }

    if (isAuthenticated || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [msg, navigate, isAuthenticated, user, dispatch]);

  if (isLoading) {
    return <h2 className='text-center'>Loading...</h2>;
  }
  return (
    <main
      className='form-signin w-100 d-flex justify-content-center  align-items-center'
      style={{ height: 'calc(100vh - 60px)' }}
    >
      <form onSubmit={onSubmit}>
        <h1 className='h3 mb-3 fw-normal'>Login</h1>

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

        <div className='checkbox mb-3'>
          <label>
            <input type='checkbox' value='remember-me' /> Remember me
          </label>
        </div>
        <button className='w-100 btn btn-lg btn-primary' type='submit'>
          Sign in
        </button>
        <p className='mt-5 mb-3 text-muted'>
          You don't have an account? <Link to='/register'>register</Link>
        </p>
      </form>
    </main>
  );
}

export default Login;
