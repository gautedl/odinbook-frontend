import { useNavigate } from 'react-router-dom';
import ProfilePicture from '../HelperComponents/ProfilePicture';

const UserCard = (props) => {
  const equalFriends = props.curUser.friends.filter((el) =>
    props.friendsID.includes(el)
  );

  const navigate = useNavigate();

  const goToUser = () => {
    navigate(`/user/page/${props.user._id}`);
  };

  const sendMsg = () => {};

  return (
    <div className="pop-card-container" onMouseLeave={props.leave}>
      <div className="pop-grid">
        <div className="profile-pic">
          <ProfilePicture user={props.user} />
        </div>
        <div className="user-info">
          <h2>{props.name}</h2>
          <div className="common-friends">
            {equalFriends.length === 0 ? (
              <p>No equal friends</p>
            ) : (
              <p>{equalFriends.length} Equal friends</p>
            )}
          </div>
        </div>
      </div>
      <div className="pop-card-btn-container">
        <button onClick={goToUser}>Go To User</button>
        <button onClick={sendMsg}>Send msg</button>
      </div>
    </div>
  );
};

export default UserCard;
