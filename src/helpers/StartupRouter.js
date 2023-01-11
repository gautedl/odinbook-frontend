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

  // useEffect(() => {
  //   fetch("/auth/login/success", {
  //     method: "GET",
  //     credentials: "include",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Credentials": true
  //     }
  //   })
  //     .then(response => {
  //       if (response.status === 200) return response.json();
  //       throw new Error("failed to authenticate user");
  //     })
  //     .then(responseJson => {

  //       localStorage.setItem('token', data.token);
  //       localStorage.setItem('user', JSON.stringify(data.user));

  //     })
  //     .catch(error => {
  //       this.setState({
  //         authenticated: false,
  //         error: "Failed to authenticate user"
  //       });
  //     });
  // })

  return <></>;
};

export default StartupRouter;
