import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../Nav/NavBar';
import { defaultUserPic } from '../../assets/SVG/svg';

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [commonFriends, setCommonFriends] = useState();
  const [FriendReqBtn, setFriendReqBtn] = useState();
  // const [errMsg, setErrMsg] = useState();

  const userID = JSON.parse(localStorage.getItem('user'))._id;
  const token = `Bearer ${localStorage.getItem('token')}`;

  useEffect(() => {
    const fetchUserData = async () => {
      const [userResponse, friendList] = await Promise.all([
        fetch(`/home/user/${id}`),
        fetch('/user/getFriends'),
      ]);
      const userData = await userResponse.json();
      const getFriends = await friendList.json();

      return [userData, getFriends];
    };

    fetchUserData().then((data) => {
      setUser(data[0]);
      const equalFriends = data[0].friends.filter((el) => data[1].includes(el));
      setCommonFriends(equalFriends);
    });
  }, [id]);

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
  }, [id, token]);

  if (id === userID) {
    return (
      <>
        <NavBar />
        {user === undefined ? (
          <></>
        ) : (
          <div className="user-container">
            <div className="user-details">
              {defaultUserPic}
              <div className="name-friends-container">
                <h1>{user.name}</h1>
              </div>
            </div>
          </div>
        )}
      </>
    );
  } else
    return (
      <>
        <NavBar />
        {user === undefined ? (
          <></>
        ) : (
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
        )}
      </>
    );
};

export default UserPage;
