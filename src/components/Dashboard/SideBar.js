import { useEffect, useState, useRef } from 'react';
import ProfilePicture from '../HelperComponents/ProfilePicture';
import UserCard from '../Cards/UserCard';

const SideBar = (props) => {
  const [userFriends, setUserFriends] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const [friendPopup, setFriendPopup] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    fetch('/user/getFriends')
      .then((res) => res.json())
      .then((data) => setUserFriends(data));
  }, []);

  // const profilePopup = (userPop) => {
  //   setShowPopup(true);
  //   setFriendPopup(userPop);
  // };

  // const removeProfilePopup = (e) => {
  //   if (!popupRef.current || !popupRef.current.contains(e.relatedTarget)) {
  //     setShowPopup(false);
  //   }
  // };

  return (
    <div className="side-bar-container">
      <div className="user">
        <ProfilePicture user={user} />
        <h1>{props.username}</h1>
      </div>
      <hr />
      <div className="friend-list">
        {userFriends.length === 0 ? (
          <h3>No friends</h3>
        ) : (
          <>
            <h2>Friends:</h2>
            {userFriends.map((friend) => (
              <div
                className="friend"
                key={friend._id}
                // onMouseLeave={removeProfilePopup}
                // onMouseEnter={() => profilePopup(friend)}
              >
                <ProfilePicture user={friend} />
                <h3>{friend.name}</h3>
              </div>
            ))}
            {/* {showPopup && (
                <div
                  ref={popupRef}
                  onMouseLeave={removeProfilePopup}
                  className="friend-pop"
                  id="friend-pop"
                >
                  <UserCard
                    id={friendPopup._id}
                    name={friendPopup.name}
                    friendsID={friendPopup.friends}
                    user={friendPopup}
                    curUser={user}
                  />
                </div>
              )} */}
          </>
        )}
      </div>
    </div>
  );
};

export default SideBar;
