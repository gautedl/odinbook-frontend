import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { defaultUserPicNav } from '../../assets/SVG/svg';
import ProfilePicture from '../HelperComponents/ProfilePicture';
import MessagesPop from './MessagesPop';
import NotifsBox from './NotifsBox';
import ProfilePop from './ProfilePop';
import SearchBox from './SearchBox';
import SettingsPop from './SettingsPop';

const NavBar = () => {
  const [searchField, setSearchField] = useState();
  const [searchValue, setSearchValue] = useState();
  const [friendRequestNotifs, setFriendRequestNotifs] = useState([]);
  const [friendRequestNotifsLength, setFriendRequestNotifsLength] = useState(
    []
  );
  const [showAlerts, setShowAlerts] = useState();
  const [showProfilePop, setShowProfilePop] = useState();
  const [showSettings, setShowSettings] = useState();
  const [showMessages, setShowMessages] = useState();
  const user = JSON.parse(localStorage.getItem('user'));

  const searchUser = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (searchValue === '' || searchValue === undefined) {
      setSearchField(undefined);
    } else {
      setSearchField(<SearchBox srcValue={searchValue} />);
    }
  }, [searchValue]);

  const showNotifs = () => {
    if (showAlerts === undefined) {
      setShowAlerts(
        <NotifsBox
          setFriendRequestNotifsLength={setFriendRequestNotifsLength}
          friendRequestNotifsLength={friendRequestNotifsLength}
        />
      );
    } else {
      setShowAlerts(undefined);
    }
  };

  const showSettingsHandler = () => {
    if (showSettings === undefined) {
      setShowSettings(<SettingsPop />);
    } else {
      setShowSettings(undefined);
    }
  };

  const showDetailPop = () => {
    if (showProfilePop === undefined) {
      setShowProfilePop(<ProfilePop open={true} user={user} />);
    } else {
      setShowProfilePop(undefined);
      <ProfilePop open={false} />;
    }
  };

  const showMessagesHandler = (e) => {
    if (showMessages === undefined) {
      setShowMessages(<MessagesPop open={true} user={user} />);
    } else {
      setShowMessages(undefined);
      <MessagesPop open={false} />;
    }
  };

  const handleWindowClick = (e) => {
    if (e.target.id !== 'notif') {
      setShowAlerts(undefined);
    }
    if (e.target.id !== 'profile-pic') {
      setShowProfilePop(undefined);
      <ProfilePop open={false} />;
    }
    if (e.target.id !== 'settings') {
      setShowSettings(undefined);
    }
    if (e.target.id !== 'messages') {
      setShowMessages(undefined);
      <MessagesPop open={false} />;
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  useEffect(() => {
    fetch(`/friend_request/show_recipient/${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        // Set so only pending is beeing counted
        const length = data.filter((x) => x.status === 'pending').length;
        setFriendRequestNotifsLength(length);
        setFriendRequestNotifs(<div className="notifs-quantity">{length}</div>);
      });
  }, [user._id]);

  return (
    <nav className="nav-container">
      <Link to="/home" className="nav-title">
        <h1>OdinBook</h1>
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

        {searchField === undefined ? (
          <></>
        ) : (
          <div className="search-field" id="search">
            {searchField}
          </div>
        )}
      </div>
      <div className="route-container">
        <div className="chat-container">
          <div className="chat">
            <svg
              id="messages"
              onClick={showMessagesHandler}
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            {showMessages === undefined ? (
              <></>
            ) : (
              <div className="messages-pop">{showMessages}</div>
            )}
          </div>
        </div>
        <div className="settings-container">
          <div className="setting">
            <svg
              id="settings"
              onClick={showSettingsHandler}
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
            {showSettings === undefined ? (
              <></>
            ) : (
              <div className="settings-pop">{showSettings}</div>
            )}
          </div>
        </div>
        <div className="profile-container" id="profile-pic">
          <div className="profile">
            <div onClick={showDetailPop} id="profile-pic">
              {user === undefined ? (
                <></>
              ) : user.profilePicture ? (
                <ProfilePicture id="profile-pic" user={user} showLink={false} />
              ) : (
                defaultUserPicNav
              )}
            </div>
            {showProfilePop === undefined ? (
              <></>
            ) : (
              <div className="profile-pop">{showProfilePop}</div>
            )}
          </div>
        </div>
        <div className="notifs-div">
          <div className="look-notifs">
            <svg
              onClick={showNotifs}
              id="notif"
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
            {friendRequestNotifsLength === 0 ? null : friendRequestNotifs}

            {showAlerts === undefined ? (
              <></>
            ) : (
              <div className="notifs-field" id="settings">
                {showAlerts}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
