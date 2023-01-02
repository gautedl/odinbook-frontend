import { useState, useEffect } from 'react';
import PostCard from '../Cards/PostCard';

const DisplayPosts = () => {
  const [ownPosts, setOwnPosts] = useState([]);

  useEffect(() => {
    fetch('/post/get_own_posts')
      .then((res) => res.json())
      .then((data) => setOwnPosts(data));
  }, []);

  return (
    <div className="posts-container">
      {ownPosts.length === 0 ? (
        <p>Loading...</p>
      ) : (
        ownPosts.map((post) => (
          <PostCard
            // route={'post'}
            likes={post.likes}
            text={post.text}
            date={post.createdAt}
            key={post._id}
            id={post._id}
            user={post.user}
            likedByUsers={post.likedByUser}
          />
        ))
      )}
    </div>
  );
};

export default DisplayPosts;
