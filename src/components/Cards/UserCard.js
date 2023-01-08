import { defaultUserPic } from '../../assets/SVG/svg';
import ProfilePicture from '../HelperComponents/ProfilePicture';

const UserCard = (props) => {
  console.log(props);
  const equalFriends = props.curUser.friends.filter((el) =>
    props.friendsID.includes(el)
  );

  return (
    <div className="pop-card-container">
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
        <button>Go To User</button>
        <button>Add Friend</button>
      </div>
    </div>
  );
};

export default UserCard;
