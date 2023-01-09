import { useState, useEffect } from 'react';
import PostCard from '../Cards/PostCard';
import Loading from '../HelperComponents/Loading';

const DisplayPosts = () => {
  //   const [ownPosts, setOwnPosts] = useState([]);
  //   const [friendsPosts, setFriendsPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);

  useEffect(() => {
    fetch('/post/get_display_posts')
      .then((res) => res.json())
      .then((data) => {
        setDisplayedPosts(data);
      });
  }, []);

  return (
    <div className="posts-container">
      {displayedPosts.length === 0 ? (
        <Loading />
      ) : displayedPosts === 'No posts' ? (
        <p>No Posts..</p>
      ) : (
        displayedPosts.map((post) => (
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
    </div>
  );
};

export default DisplayPosts;
