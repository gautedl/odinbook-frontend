import CreatePost from '../Dashboard/CreatePost';
import SideBar from '../Dashboard/SideBar';
import NavBar from '../Nav/NavBar';

const Home = () => {
  const userName = JSON.parse(localStorage.getItem('user')).name;
  const userID = JSON.parse(localStorage.getItem('user'))._id;

  return (
    <div className="home">
      <NavBar />
      <div className="dashboard">
        <div className="side-bar">
          <SideBar id={userID} username={userName} />
        </div>
        <div className="dashboard-container">
          <CreatePost username={userName} />
        </div>
      </div>
    </div>
  );
};

export default Home;
