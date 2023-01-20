import { useState, useEffect } from 'react';
import PostCard from '../Cards/PostCard';
import Loading from '../HelperComponents/Loading';
import CreatePost from './CreatePost';

const DisplayPosts = ({ user = null, route }) => {
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [num, setNum] = useState(5);
  const [slicedArray, setSlicedArray] = useState([]);

  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (route !== 'get_display_posts') {
      fetch(
        `https://gautedl-odinbook.onrender.com/post/get_user_post/${user._id}`
      )
        .then((res) => res.json())
        .then((data) => {
          setDisplayedPosts(data);
          setSlicedArray(data.slice(0, 5));
        });
    } else if (route === 'get_display_posts') {
      fetch(
        `https://gautedl-odinbook.onrender.com/post/get_display_posts/${loggedInUser._id}`
      )
        .then((res) => res.json())
        .then((data) => {
          setDisplayedPosts(data);
          setSlicedArray(data.slice(0, 5));
        });
    }
  }, [user._id, route, loggedInUser._id]);

  useEffect(() => {
    setSlicedArray(displayedPosts.slice(0, num));
  }, [displayedPosts, num]);

  const showMore = () => {
    setNum(num + 5);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="posts-container">
      {user._id === loggedInUser._id ? (
        <CreatePost
          setDisplayedPosts={setDisplayedPosts}
          displayedPosts={displayedPosts}
        />
      ) : (
        <></>
      )}
      {slicedArray.length === 0 ? (
        <Loading />
      ) : slicedArray === 'No po' ? (
        <p>No Posts..</p>
      ) : (
        <>
          {slicedArray.map((post) => {
            if (user._id === loggedInUser._id) {
              return (
                <PostCard
                  // route={'post'}
                  likes={post.likes}
                  text={post.text}
                  date={post.createdAt}
                  key={post._id}
                  id={post._id}
                  user={loggedInUser}
                  likedByUsers={post.likedByUser}
                  comments={post.comments}
                />
              );
            } else {
              return (
                <PostCard
                  // route={'post'}
                  likes={post.likes}
                  text={post.text}
                  date={post.createdAt}
                  key={post._id}
                  id={post._id}
                  user={post.user}
                  likedByUsers={post.likedByUser}
                  comments={post.comments}
                />
              );
            }
          })}
          <div className="post-footer">
            {slicedArray.length === num ? (
              <p className="post-link" onClick={showMore}>
                Show More Posts
              </p>
            ) : (
              <p className="post-link no-more">No More Posts</p>
            )}

            <p onClick={scrollToTop} className="post-link">
              Go Back to the top
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default DisplayPosts;
