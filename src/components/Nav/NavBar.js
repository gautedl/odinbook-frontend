import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { defaultUserPic } from '../../assets/SVG/svg';
import SearchBox from './SearchBox';

const NavBar = () => {
  const [searchField, setSearchField] = useState();
  const [searchValue, setSearchValue] = useState();
  const [friendRequestNotifs, setFriendRequestNotifs] = useState([]);
  const [friendRequestNotifsLength, setFriendRequestNotifsLength] = useState(
    []
  );

  const searchUser = (e) => {
    setSearchValue(e.target.value);
    // if (e.target.value === '') {
    //   setSearchField(undefined);
    // }
    // setSearchField(<SearchBox srcValue={e.target.value} />);
  };
  useEffect(() => {
    if (searchValue === '' || searchValue === undefined) {
      setSearchField(undefined);
    } else {
      setSearchField(<SearchBox srcValue={searchValue} />);
    }
  }, [searchValue]);
  const showNotifs = () => {
    console.log(friendRequestNotifs);
  };

  useEffect(() => {
    fetch('/friend_request/show_recipient')
      .then((res) => res.json())
      .then((data) => {
        setFriendRequestNotifs(data);
        setFriendRequestNotifsLength(
          <div className="notifs-quantity">{data.length}</div>
        );
      });
  }, []);

  return (
    <nav className="nav-container">
      <Link to="/home">
        <h1 className="nav-title">OdinBook</h1>
      </Link>
      <div className="search-container">
        <svg
          id="search"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.364 3a7.364 7.364 0 1 0 0 14.727 7.364 7.364 0 0 0 0-14.727v0Z"></path>
          <path d="M15.857 15.86 21 21.001"></path>
        </svg>
        <input
          type="text"
          placeholder="Search for user"
          onChange={searchUser}
          name="src"
          id="search"
        ></input>
        <div className="search-field" id="search">
          {searchField === undefined ? <></> : searchField}
        </div>
      </div>
      <div className="route-container">
        <Link to="/settings">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6z"></path>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </Link>
        <>{defaultUserPic}</>
        <div className="notifs-div">
          <svg
            onClick={showNotifs}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          {friendRequestNotifsLength}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
