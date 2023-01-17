import { useState, useRef, useEffect } from 'react';
import ProfilePicture from '../HelperComponents/ProfilePicture';
import axios from 'axios';

const EditUser = ({ user, showEditUser, setShowEditUser }) => {
  const [aboutUser, setAboutUser] = useState(user.about);
  const hiddenFileInput = useRef(null);

  const token = `Bearer ${localStorage.getItem('token')}`;

  const changeProfilePic = () => {
    hiddenFileInput.current.click();
  };

  const handleFileChange = async (e) => {
    try {
      const file = await e.target.files[0];

      const fd = new FormData();
      fd.append('profilePicture', file);

      const response = await axios.post('/user/upload_profile_picture', fd, {});

      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const saveChanges = () => {
    const req = {
      about: aboutUser,
    };

    fetch('/user/edit_about_user', {
      method: 'POST',
      body: JSON.stringify(req),
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === 'updated') {
          setShowEditUser(false);
        }
      });
  };

  const handleWindowClick = (e) => {
    if (e.target.id === 'page-mask') {
      setShowEditUser(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  return (
    <>
      {showEditUser && (
        <>
          <div className="edit-user-container">
            <div className="edit-header">
              <div></div>
              <h1>Edit Information</h1>
              <svg
                onClick={() => {
                  setShowEditUser(!showEditUser);
                }}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z"></path>
                <path d="m15 9-6 6"></path>
                <path d="m9 9 6 6"></path>
              </svg>
            </div>
            <div className="edit-container">
              <div className="container-header">
                <h2>Profile Picture</h2>
              </div>
              <div className="images-container">
                <div className="images">
                  <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    name="profilePicture"
                  />
                  <ProfilePicture
                    cClass="edit-user-pic"
                    user={user}
                    showLink={false}
                  />
                  <svg
                    onClick={changeProfilePic}
                    className="image-overlay"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13 21H3.6a.6.6 0 0 1-.6-.6V3.6a.6.6 0 0 1 .6-.6h16.8a.6.6 0 0 1 .6.6V13"></path>
                    <path d="m3 16 7-3 5.5 2.5"></path>
                    <path d="M16 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"></path>
                    <path d="M19 19v3m-3-3h3-3Zm6 0h-3 3Zm-3 0v-3 3Z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="edit-container">
              <div className="container-header">
                <h2>About</h2>
              </div>
              <div className="about-edit-container">
                <textarea
                  className="input-field-about"
                  id="about"
                  value={aboutUser || ''}
                  name="about"
                  onChange={(e) => {
                    setAboutUser(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="btn-container">
              <button onClick={saveChanges}>Save Changes</button>
            </div>
          </div>
          <div className="page-mask" id="page-mask"></div>
        </>
      )}
    </>
  );
};

export default EditUser;
