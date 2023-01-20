import { useEffect, useState } from 'react';
import { AcceptButton, DeclineButton } from '../HelperComponents/Buttons';
import ProfilePicture from '../HelperComponents/ProfilePicture';

const NotifsBox = ({
  setFriendRequestNotifsLength,
  friendRequestNotifsLength,
}) => {
  const [friendRequestNotifs, setFriendRequestNotifs] = useState();

  const token = `Bearer ${localStorage.getItem('token')}`;
  const userId = localStorage.getItem('user')._id;

  useEffect(() => {
    fetch(
      `https://gautedl-odinbook.onrender.com/friend_request/show_recipient/${userId}`
    )
      .then((res) => res.json())
      .then((data) => {
        // setFriendRequestNotifs(data);
        setFriendRequestNotifs(data.filter((req) => req.status === 'pending'));
      });
  }, [userId]);

  const acceptRequest = (senderId) => {
    const body = {
      userId: userId,
    };

    fetch(
      `https://gautedl-odinbook.onrender.com/friend_req/accept/${senderId}`,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          //Authorization: token,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data === 'accepted') {
          setFriendRequestNotifsLength(friendRequestNotifsLength - 1);
        } else {
          return console.log(data.message);
        }
      });
  };

  const declineRequest = (senderId) => {
    const body = {
      userId: userId,
    };

    fetch(
      `https://gautedl-odinbook.onrender.com/friend_req/reject/${senderId}`,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          //Authorization: token,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data === 'rejected') {
          setFriendRequestNotifsLength(friendRequestNotifsLength - 1);
        } else {
          return console.log(data.message);
        }
      });
  };

  return (
    <>
      {friendRequestNotifs === undefined ? (
        <></>
      ) : (
        <div className="notifs-box" id="notif">
          <ul>
            {friendRequestNotifs.length === 0 ? (
              <li>No Notifications</li>
            ) : (
              friendRequestNotifs.map((data) => {
                if (data.status !== 'pending') {
                  return null;
                } else
                  return (
                    <li key={data._id} id="notif">
                      <ProfilePicture user={data.sender} />
                      {data.sender.name}{' '}
                      <div className="btn-container">
                        {<AcceptButton click={() => acceptRequest(data._id)} />}
                        {
                          <DeclineButton
                            click={() => declineRequest(data._id)}
                          />
                        }
                      </div>
                    </li>
                  );
              })
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default NotifsBox;
