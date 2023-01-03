import { useParams } from 'react-router-dom';
import NavBar from '../Nav/NavBar';

const UserPage = () => {
  const { id } = useParams();

  return (
    <>
      <NavBar />
    </>
  );
};

export default UserPage;
