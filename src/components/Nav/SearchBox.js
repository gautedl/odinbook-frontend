import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfilePicture from '../HelperComponents/ProfilePicture';

const SearchBox = ({ srcValue }) => {
  const [searchResults, setSearchResults] = useState();
  const [open, setOpen] = useState(false);

  const userID = JSON.parse(localStorage.getItem('user'))._id;

  useEffect(() => {
    const body = { search_name: srcValue };

    fetch('/search_user', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data);
        if (srcValue === '') {
          setOpen(false);
        } else setOpen(true);
      });
  }, [srcValue]);

  const handleWindowClick = (e) => {
    if (e.target.id !== 'search') {
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleWindowClick);

    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  return (
    <>
      {open === false ? (
        <></>
      ) : (
        <div className="search-box">
          <ul id="search">
            {searchResults.map((data) => {
              if (data._id === userID) {
                return null;
              } else {
                return (
                  <Link key={data._id} to={`/user/page/${data._id}`}>
                    <li id="search">
                      <ProfilePicture user={data} />
                      {data.name}
                    </li>
                  </Link>
                );
              }
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default SearchBox;
