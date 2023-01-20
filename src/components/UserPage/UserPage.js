import UserPageHeader from './UserPageHeader';
import NavBar from '../Nav/NavBar';
import UserPageBody from './UserPageBody';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../HelperComponents/Loading';

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    fetch(`https://gautedl-odinbook.onrender.com/home/user/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [id]);

  return (
    <>
      <NavBar />
      <div className="user-page-container">
        {user === undefined ? (
          <div className="center-loading">
            <Loading />
          </div>
        ) : (
          <>
            <UserPageHeader user={user} setUser={setUser} />
            <UserPageBody user={user} setUser={setUser} />
            <div></div>
          </>
        )}
      </div>
    </>
  );
};

export default UserPage;
