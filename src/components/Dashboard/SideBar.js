import { useEffect, useState } from 'react';
import { defaultUserPic } from '../../assets/SVG/svg';

const SideBar = (props) => {
  const [userFriends, setUserFriends] = useState([]);

  useEffect(() => {
    fetch('/user/getFriends')
      .then((res) => res.json())
      .then((data) => setUserFriends(data));
  }, []);

  return (
    <div className="side-bar-container">
      <div className="user">
        {defaultUserPic}
        <h1>{props.username}</h1>
      </div>
      <hr />
      <div className="friend-list">
        {userFriends.length === 0 ? <h3>No friends</h3> : <>Friends</>}
      </div>
    </div>
  );
};

export default SideBar;
