import UserPageHeader from './UserPageHeader';
import NavBar from '../Nav/NavBar';
import UserPageBody from './UserPageBody';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [commonFriends, setCommonFriends] = useState();
  const [userFriends, setUserFriends] = useState();
  // const [errMsg, setErrMsg] = useState();

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
      setUserFriends(data[1]);
      const equalFriends = data[0].friends.filter((el) => data[1].includes(el));
      setCommonFriends(equalFriends);
    });
  }, [id]);

  return (
    <>
      <NavBar />
      {user === undefined ? (
        <p>Loading...</p>
      ) : (
        <div className="user-page-container">
          <UserPageHeader
            user={user}
            commonFriends={commonFriends}
            userFriends={userFriends}
          />
          <UserPageBody
            user={user}
            commonFriends={commonFriends}
            userFriends={userFriends}
          />
        </div>
      )}
    </>
  );
};

export default UserPage;
