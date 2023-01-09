import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import UserCard from '../Cards/UserCard';
import axios from 'axios';
import ProfilePicture from '../HelperComponents/ProfilePicture';

const UserPageHeader = ({ user }) => {
  const { id } = useParams();
  const [FriendReqBtn, setFriendReqBtn] = useState();
  const [friendPopup, setFriendPopup] = useState();

  const userID = JSON.parse(localStorage.getItem('user'))._id;
  const token = `Bearer ${localStorage.getItem('token')}`;
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  const equalFriends = user.friends.filter((el) =>
    loggedInUser.friends.includes(el._id)
  );

  const hiddenFileInput = useRef(null);

  useEffect(() => {
    const addFriend = () => {
      fetch(`/friend_req/${id}/send_req`, {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data === 'sent') {
            setFriendReqBtn(
              <button onClick={deleteReq}>
                {' '}
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.48 7.44a6 6 0 1 1-5.456 3.497.6.6 0 0 0-1.09-.5A7.2 7.2 0 1 0 12.48 6.24v1.2Z"
                    clip-rule="evenodd"
                  ></path>
                  <path d="M12.48 9.199V4.48a.3.3 0 0 0-.492-.23L9.156 6.608a.3.3 0 0 0 0 .461l2.832 2.36a.3.3 0 0 0 .492-.231Z"></path>
                </svg>
                Undo Friend Request
              </button>
            );
          }
        });
    };
    const deleteReq = () => {};

    fetch(`/friend_request/${id}/find`)
      .then((res) => res.json())
      .then((data) => {
        if (data === 'Not sent') {
          setFriendReqBtn(
            <button onClick={addFriend}>
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 9v3-3Zm0 3v3-3Zm0 0h3-3Zm0 0h-3 3Zm-5-5a4 4 0 1 1-8 0 4 4 0 0 1 8 0v0ZM3 20a6 6 0 1 1 12 0v1H3v-1Z"></path>
              </svg>
              Add Friend
            </button>
          );
        } else if (data === 'Request sent') {
          setFriendReqBtn(
            <button onClick={deleteReq}>Undo Friend Request</button>
          );
        } else if (data === 'Request received') {
          setFriendReqBtn(<button>Answer Request</button>);
        } else if (data === 'Friends') {
          setFriendReqBtn(
            <button>
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                <path d="M5 22v-5l-1-1v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4l-1 1v5"></path>
                <path d="M17 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                <path d="M15 22v-4h-2l2-6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1l2 6h-2v4"></path>
              </svg>
              Friends
            </button>
          );
        }
      });
  }, [id, token]);

  const profilePopup = (userPop) => {
    setFriendPopup(
      <UserCard
        leave={removeProfilePopup}
        id={userPop._id}
        name={userPop.name}
        friendsID={userPop.friends}
        user={userPop}
        curUser={user}
      />
    );
  };

  const removeProfilePopup = () => {
    setFriendPopup(undefined);
  };

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

  return (
    <>
      {user === undefined ? (
        <></>
      ) : (
        <div className="user-page">
          <div className="user-container">
            <div className="profile-header">
              <div className="user-details">
                <div className="profile-pic-container">
                  <div className="profile-pic">
                    <ProfilePicture user={user} />
                  </div>
                  {id === userID ? (
                    <div className="change-profile-pic">
                      <input
                        type="file"
                        ref={hiddenFileInput}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        name="profilePicture"
                      />
                      <svg
                        onClick={changeProfilePic}
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                        <path d="M12 9a4 4 0 1 0 0 8 4 4 0 1 0 0-8z"></path>
                      </svg>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="name-friends-container">
                  <h1>{user.name}</h1>
                  {
                    <>
                      <div className="have-friends">
                        <h3>{user.friends.length} friends </h3>
                        {id === userID ? (
                          <></>
                        ) : (
                          <h3> | {equalFriends.length} common</h3>
                        )}
                      </div>
                      <div className="friend-pics">
                        {user.friends.map((friend) => (
                          <div
                            // onMouseLeave={removeProfilePopup}
                            onMouseEnter={() => profilePopup(friend)}
                            className="user-pic"
                            key={friend._id}
                          >
                            <ProfilePicture user={friend} />
                          </div>
                        ))}
                      </div>
                      {friendPopup === undefined ? (
                        <></>
                      ) : (
                        <div className="friend-pop" id="friend-pop">
                          {friendPopup}
                        </div>
                      )}{' '}
                    </>
                  }
                </div>
              </div>
              <div className="btn-container">
                {id === userID ? (
                  <button>
                    {
                      <svg
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16.303 4.303a2.4 2.4 0 1 1 3.394 3.394l-.952.951-3.393-3.393.951-.952Zm-2.648 2.649L3.6 17.006V20.4h3.394L17.05 10.345l-3.396-3.393Z"></path>
                      </svg>
                    }
                    Edit Profile
                  </button>
                ) : FriendReqBtn !== undefined ? (
                  FriendReqBtn
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPageHeader;
