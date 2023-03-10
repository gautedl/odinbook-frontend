import { useEffect, useState } from 'react';
import Loading from '../HelperComponents/Loading';
import ProfilePicture from '../HelperComponents/ProfilePicture';

const SideBar = (props) => {
  const [userFriends, setUserFriends] = useState();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetch(`/user/getFriends/${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserFriends(data);
      });
  }, [user._id]);

  return (
    <div className="side-bar-container">
      {userFriends === undefined ? (
        <Loading />
      ) : (
        <>
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
                  <div className="friend" key={friend._id}>
                    <ProfilePicture user={friend} />
                    <h3>{friend.name}</h3>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SideBar;
