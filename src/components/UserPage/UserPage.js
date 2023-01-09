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
    fetch(`/home/user/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [id]);

  return (
    <>
      <NavBar />
      {user === undefined ? (
        <div className="center-loading">
          <Loading />
        </div>
      ) : (
        <div className="user-page-container">
          <UserPageHeader user={user} />
          <UserPageBody user={user} />
        </div>
      )}
    </>
  );
};

export default UserPage;
