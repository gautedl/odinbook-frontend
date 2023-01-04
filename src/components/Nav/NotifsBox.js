import { useEffect, useState } from 'react';
import { AcceptButton, DeclineButton } from '../HelperComponents/Buttons';

const NotifsBox = ({ notifsValue }) => {
  const [friendRequestNotifs, setFriendRequestNotifs] = useState();
  // const [showNotifs, setShowNotifs] = useState(notifsValue);

  const token = `Bearer ${localStorage.getItem('token')}`;

  useEffect(() => {
    fetch('/friend_request/show_recipient')
      .then((res) => res.json())
      .then((data) => {
        setFriendRequestNotifs(data);
      });
  }, []);

  // const handleWindowClick = (e) => {
  //   if (e.target.id !== 'notif') {
  //     console.log('yo');
  //     setShowNotifs(false);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener('click', handleWindowClick);

  //   return () => {
  //     window.removeEventListener('click', handleWindowClick);
  //   };
  // }, []);

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
        /*showNotifs === false ? (
        <></>
      ) :*/ <div className="notifs-box" id="notif">
          <ul>
            {friendRequestNotifs.map((data) => {
              if (data.status !== 'pending') {
                return null;
              } else
                return (
                  <li key={data._id} id="notif">
                    {data.sender.name}{' '}
                    <div className="btn-container">
                      {<AcceptButton click={() => acceptRequest(data._id)} />}
                      {<DeclineButton click={() => declineRequest(data._id)} />}
                    </div>
                  </li>
                );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default NotifsBox;
