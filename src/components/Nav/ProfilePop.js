import { Link, useNavigate } from 'react-router-dom';
import ProfilePicture from '../HelperComponents/ProfilePicture';

const ProfilePop = ({ open }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const logOut = () => {
    fetch('/log_out')
      .then((res) => res.json())
      .then((data) => {
        if (data === 'logged out') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/');
        }
      });
  };

  return (
    <>
      {open === false ? (
        <></>
      ) : (
        <div className="profile-box" id="profile-pic">
          <ul>
            <Link to={`/user/page/${user._id}`}>
              <li>
                <ProfilePicture user={user} showLink={false} />
                <h3>{user.name}</h3>
              </li>
            </Link>
            {/*<Link to="/settings">
              <li>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6z"></path>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                <h3>Settings</h3>
              </li>
      </Link>*/}
            <li onClick={logOut}>
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <path d="m16 17 5-5-5-5"></path>
                <path d="M21 12H9"></path>
              </svg>
              <h3>Log out</h3>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default ProfilePop;
