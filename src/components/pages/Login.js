import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/general.scss';

const Login = () => {
  const [selectedEmail, setSelectedEmail] = useState();
  const [selectedPassword, setSelectedPassword] = useState();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const user = {
      email: selectedEmail,
      password: selectedPassword,
    };

    fetch(`/login`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          console.log('Error');
          return;
        }
        return res.json();
      })
      .then((data) => {
        // Stores the user credentials in locale storage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/home');
      });
  };

  const fbHandler = (e) => {
    e.preventDefault();
    fetch('/auth/facebook')
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="login-container">
      <div className="greeting">
        <h1>Sign in to your account</h1>
      </div>
      <div className="login-field">
        <form>
          <div className="input-field">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email:"
              onChange={(e) => {
                setSelectedEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password:"
              onChange={(e) => {
                setSelectedPassword(e.target.value);
              }}
              required
            />
          </div>
          <button onClick={submitHandler}>Sign in</button>
          <button className="fb" onClick={fbHandler}>
            Log in with Facebook
          </button>
        </form>
        <div className="sign-up">
          <p>Not a user?</p>{' '}
          <Link className="link" to="/sign_up">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
