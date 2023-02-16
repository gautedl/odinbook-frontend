import { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ProfilePicture from '../HelperComponents/ProfilePicture';
dayjs.extend(relativeTime);

const CommentCard = (props) => {
  const [likes, setLikes] = useState(props.likes);
  const [err, setErr] = useState();

  const userID = JSON.parse(localStorage.getItem('user'))._id;
  const token = `Bearer ${localStorage.getItem('token')}`;

  const date = new Date(props.createdAt);

  const timePassed = dayjs(date).fromNow(true);

  const getLikes = () => {
    fetch(`/comment/${props.id}/get_likes`)
      .then((res) => res.json())
      .then((data) => setLikes(data));
  };

  const likePost = (e) => {
    e.preventDefault();

    const req = {
      userId: userID,
    };

    fetch(`/comment/${props.id}/like`, {
      method: 'POST',
      body: JSON.stringify(req),
      headers: {
        //Authorization: token,
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

    const req = {
      userId: userID,
    };

    fetch(`/comment/${props.id}/dislike`, {
      method: 'POST',
      body: JSON.stringify(req),
      headers: {
        //Authorization: token,
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
    props.likedByUser.includes(userID) ? (
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
    <div className="single-comment">
      <div className="user-pic">
        <ProfilePicture user={props.user} />
      </div>
      <div className="comment-info">
        <div className="comment-box">
          <div className="box">
            <h3>{props.user.name}</h3>
            <span>{props.text}</span>
          </div>
        </div>
        <div className="comment-info-footer">
          <div className="likes">
            {likeButton} {likes === 0 ? <></> : <p>{likes}</p>}
          </div>
          <p>{timePassed} ago</p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
