import { useState, useEffect } from 'react';
import PostCard from '../Cards/PostCard';
import Loading from '../HelperComponents/Loading';

const DisplayPosts = ({ route }) => {
  //   const [ownPosts, setOwnPosts] = useState([]);
  //   const [friendsPosts, setFriendsPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [num, setNum] = useState(5);

  useEffect(() => {
    fetch(`/post/${route}`)
      .then((res) => res.json())
      .then((data) => {
        setDisplayedPosts(data);
      });
  }, [route]);

  const slicedArray = displayedPosts.slice(0, num);

  const showMore = () => {
    setNum(num + 5);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="posts-container">
      {displayedPosts.length === 0 ? (
        <Loading />
      ) : displayedPosts === 'No posts' ? (
        <p>No Posts..</p>
      ) : (
        slicedArray.map((post) => (
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
        ))
      )}
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
    </div>
  );
};

export default DisplayPosts;
