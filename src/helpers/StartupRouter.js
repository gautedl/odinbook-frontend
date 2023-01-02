import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StartupRouter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/user/isLoggedIn')
      .then((res) => res.json())
      .then((data) => {
        if (data !== 'Logged in') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
        } else {
          navigate('/home');
        }
      });
  });

  return <></>;
};

export default StartupRouter;
