import DisplayPosts from '../Dashboard/DisplayPosts';
import Loading from '../HelperComponents/Loading';
import ProfilePicture from '../HelperComponents/ProfilePicture';
import { useState } from 'react';

const UserPageBody = ({ user }) => {
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const equalFriends = user.friends.filter((el) =>
    loggedInUser.friends.includes(el._id)
  );

  // Code to showcase more friends
  // const [numberFriends, setNumberFriends] = useState(6);

  // // const seeMoreFriends = () => {
  // //   setNumberFriends(numberFriends + 6);
  // // };

  return (
    <>
      {user === undefined ? (
        <Loading />
      ) : (
        <div className="user-page-body-container">
          <div className="side-bar">
            <div className="about-container">
              <h3>About</h3>
              {user.about ===
              (
                <span>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                  natoque penatibus et magnis dis parturient montes, nascetur
                  ridiculus mus. Donec quam felis, ultricies nec, pellentesque
                  eu, pretium quis, sem. Nulla consequat massa quis enim. Donec
                  pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.
                  In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
                  justo. Nullam dictum felis eu pede mollis pretium. Integer
                  tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
                  vulputate eleifend tellus. Aenean leo ligula, porttitor eu,
                  consequat vitae, eleifend ac, enim. Aliquam lorem ante,
                  dapibus in, viverra quis, feugiat a,
                </span>
              ) ? (
                <></>
              ) : (
                <span>{user.about}</span>
              )}
            </div>
            <div className="friends-container">
              <div className="friends-container-header">
                <div className="titles">
                  <h3>Friends</h3>
                  {/* <h3 className="see-all" onClick={seeMoreFriends}>
                    See more friends
                  </h3> */}
                </div>
                {user._id === loggedInUser._id ? (
                  <></>
                ) : (
                  <h4>{equalFriends.length} friends in common</h4>
                )}
              </div>
              <div className="friends">
                {user._id === loggedInUser._id
                  ? user.friends.map((friend, i) => (
                      <div className="friend" key={friend._id}>
                        <ProfilePicture user={friend} />
                        <h4>{friend.name}</h4>
                      </div>
                    ))
                  : equalFriends.map((friend) => (
                      <div className="friend" key={friend._id}>
                        <ProfilePicture user={friend} />
                        <h4>{friend.name}</h4>
                      </div>
                    ))}
              </div>
            </div>
          </div>
          <div className="users-posts">
            {user._id === loggedInUser._id ? (
              <>
                <DisplayPosts user={user} />
              </>
            ) : (
              <DisplayPosts user={user} />
            )}
          </div>
          <div></div>
        </div>
      )}
    </>
  );
};

export default UserPageBody;
