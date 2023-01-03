import { useEffect, useState } from 'react';
import { defaultUserPic } from '../../assets/SVG/svg';

const PostCard = (props) => {
  const [likes, setLikes] = useState(props.likes);
  const [err, setErr] = useState([]);
  const [user, setUser] = useState();

  const token = `Bearer ${localStorage.getItem('token')}`;
  const userID = JSON.parse(localStorage.getItem('user'))._id;

  useEffect(() => {
    fetch(`/home/user/${props.user._id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [props.user]);

  const date = new Date(props.date);
  const date_formated = date.toLocaleDateString('en-gb', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  const getLikes = () => {
    fetch(`/post/${props.id}/get_likes`)
      .then((res) => res.json())
      .then((data) => setLikes(data));
  };

  const likePost = (e) => {
    e.preventDefault();

    fetch(`/post/${props.id}/like_post`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data !== 'Liked!') {
          setErr(data);
        }
        getLikes();
        setLikeButton(
          <svg
            width="25"
            height="25"
            fill="#13aff0"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={dislikePost}
            cursor="pointer"
          >
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
          </svg>
        );
      });
  };

  const dislikePost = (e) => {
    e.preventDefault();

    fetch(`/post/${props.id}/dislike_post`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data !== 'Disliked!') {
          setErr(data);
        }
        getLikes();
        setLikeButton(
          <svg
            width="25"
            height="25"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={likePost}
            cursor="pointer"
          >
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
          </svg>
        );
      });
  };

  const [likeButton, setLikeButton] = useState(
    props.likedByUsers.includes(userID) ? (
      <svg
        width="25"
        height="25"
        fill="#13aff0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        onClick={dislikePost}
        cursor="pointer"
      >
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
      </svg>
    ) : (
      <svg
        width="25"
        height="25"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        onClick={likePost}
        cursor="pointer"
      >
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
      </svg>
    )
  );

  return (
    <div className="post-card">
      {user === undefined ? (
        <p>Loading...</p>
      ) : (
        <>
          {defaultUserPic}
          <h1 className="user">{user.name}</h1>
          <p className="text">{props.text}</p>
          <div className="footer-container">
            <p className="date">{date_formated}</p>
            <div className="like-container">
              {likeButton}
              {likes}
            </div>
          </div>
          {err.map((err, i) => (
            <p className="error-msg" key={i}>
              {err.message}
            </p>
          ))}
        </>
      )}
    </div>
  );
};

export default PostCard;
