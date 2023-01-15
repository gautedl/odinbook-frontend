import DisplayPosts from '../Dashboard/DisplayPosts';
import SideBar from '../Dashboard/SideBar';
import NavBar from '../Nav/NavBar';

const Home = () => {
  const userName = JSON.parse(localStorage.getItem('user')).name;
  const userID = JSON.parse(localStorage.getItem('user'))._id;

  return (
    <>
      <NavBar />
      <div className="home">
        <div className="dashboard">
          <div className="side-bar">
            <SideBar id={userID} username={userName} />
          </div>
          <div className="dashboard-container">
            <DisplayPosts route="get_display_posts" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
