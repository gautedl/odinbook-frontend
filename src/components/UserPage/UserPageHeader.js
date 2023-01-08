import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { defaultUserPic } from '../../assets/SVG/svg';
import UserCard from '../Cards/UserCard';
import axios from 'axios';
import { Buffer } from 'buffer';
import ProfilePicture from '../HelperComponents/ProfilePicture';

const UserPageHeader = ({ user, userFriends, commonFriends }) => {
  const { id } = useParams();
  const [FriendReqBtn, setFriendReqBtn] = useState();
  const [friendPopup, setFriendPopup] = useState();

  const [image, setImage] = useState();

  const userID = JSON.parse(localStorage.getItem('user'))._id;
  const token = `Bearer ${localStorage.getItem('token')}`;

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
              <button onClick={deleteReq}>Undo Friend Request</button>
            );
          }
        });
    };
    const deleteReq = () => {};

    fetch(`/friend_request/${id}/find`)
      .then((res) => res.json())
      .then((data) => {
        if (data === 'Not sent') {
          setFriendReqBtn(<button onClick={addFriend}>Add Friend</button>);
        } else if (data === 'Request sent') {
          setFriendReqBtn(
            <button onClick={deleteReq}>Undo Friend Request</button>
          );
        } else if (data === 'Request received') {
          setFriendReqBtn(<button>Answer Request</button>);
        }
      });

    if (user.profilePicture) {
      const imageData = Buffer.from(user.profilePicture.data.data).toString(
        'base64'
      );

      const imageUrl = `data:${user.profilePicture.contentType};base64,${imageData}`;

      setImage(<img src={imageUrl} alt="" />);
    } else {
      setImage(defaultUserPic);
    }
  }, [id, token, user.profilePicture]);

  const profilePopup = (userPop) => {
    setFriendPopup(
      <UserCard
        id={userPop._id}
        name={userPop.name}
        friendsID={userPop.friends}
        user={userPop}
        curUser={user}
      />
    );
  };

  const removieProfilePopup = () => {
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

  if (id === userID) {
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
                  </div>
                  <div className="name-friends-container">
                    <h1>{user.name}</h1>
                    <h3>{user.friends.length} friends</h3>
                    <div className="friend-pics">
                      {userFriends.map((friend) => (
                        <div
                          onMouseEnter={() => profilePopup(friend)}
                          onMouseLeave={removieProfilePopup}
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
                    )}
                  </div>
                </div>
                <div className="btn-container">
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
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  } else
    return (
      <>
        {user === undefined ? (
          <></>
        ) : (
          <div className="user-page">
            <div className="user-container">
              <div className="user-details">
                {defaultUserPic}
                <div className="name-friends-container">
                  <h1>{user.name}</h1>
                  <h3>{commonFriends.length} Common Friends </h3>
                </div>
                <div className="btn-container">{FriendReqBtn}</div>
              </div>
            </div>
          </div>
        )}
      </>
    );
};

export default UserPageHeader;
