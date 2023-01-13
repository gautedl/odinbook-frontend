import { useEffect, useState } from 'react';
import { AcceptButton, DeclineButton } from '../HelperComponents/Buttons';
import ProfilePicture from '../HelperComponents/ProfilePicture';

const NotifsBox = ({ notifsValue }) => {
  const [friendRequestNotifs, setFriendRequestNotifs] = useState();

  const token = `Bearer ${localStorage.getItem('token')}`;

  useEffect(() => {
    fetch('/friend_request/show_recipient')
      .then((res) => res.json())
      .then((data) => {
        // setFriendRequestNotifs(data);
        setFriendRequestNotifs(data.filter((req) => req.status === 'pending'));
      });
  }, []);

  const acceptRequest = (senderId) => {
    console.log(senderId);
    fetch(`/friend_req/accept/${senderId}`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === 'accepted') {
          return console.log('friend, added');
        } else {
          return console.log(data.message);
        }
      });
  };

  const declineRequest = (senderId) => {
    fetch(`/friend_req/reject/${senderId}`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === 'rejected') {
          return console.log('Declined');
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
