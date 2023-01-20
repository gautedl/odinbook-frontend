import { useEffect, useState } from 'react';
import CommentsCard from './CommentsCard';
import ProfilePicture from '../HelperComponents/ProfilePicture';
import Loading from '../HelperComponents/Loading';

const PostCard = (props) => {
  const [likes, setLikes] = useState(props.likes);
  const [err, setErr] = useState([]);
  const [user, setUser] = useState();
  const [comment, setComment] = useState();
  const [showCommentsPost, setShowCommentsPost] = useState();
  const [comments, setComments] = useState(props.comments);

  const token = `Bearer ${localStorage.getItem('token')}`;
  const userID = JSON.parse(localStorage.getItem('user'))._id;
  const curUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetch(`https://gautedl-odinbook.onrender.com/home/user/${props.user._id}`)
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
    fetch(`https://gautedl-odinbook.onrender.com/post/${props.id}/get_likes`)
      .then((res) => res.json())
      .then((data) => setLikes(data));
  };

  const likePost = (e) => {
    e.preventDefault();

    fetch(
      `https://gautedl-odinbook.onrender.com/post/${props.id}/like_post/${userID}`,
      {
        method: 'POST',
        headers: {
          // //Authorization: token,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data !== 'Liked!') {
          setErr(data);
        }
        getLikes();
        setLikeButton(
          <svg
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

    fetch(
      `https://gautedl-odinbook.onrender.com/post/${props.id}/dislike_post/${userID}`,
      {
        method: 'POST',
        headers: {
          // //Authorization: token,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data !== 'Disliked!') {
          setErr(data);
        }
        getLikes();
        setLikeButton(
          <svg
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

  const input = document.getElementById('comment');

  const postComment = () => {
    const newComment = {
      text: comment,
      userId: userID,
    };

    fetch(
      `https://gautedl-odinbook.onrender.com/comment/${props.id}/create_comment`,
      {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
          //Authorization: token,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.msg !== 'posted') {
          setErr(data);
        } else {
          const updatedComments = [...comments, data.comment];
          setComments(updatedComments);
          input.value = '';
          setShowCommentsPost(
            <CommentsCard postId={props.id} comments={updatedComments} />
          );
        }
      });
  };

  const showComments = () => {
    if (showCommentsPost === undefined) {
      setShowCommentsPost(
        <CommentsCard postId={props.id} comments={comments} />
      );
    } else {
      setShowCommentsPost(undefined);
    }
  };

  return (
    <div className="post-card" id={`comment-${props.id}`}>
      {user === undefined ? (
        <Loading />
      ) : (
        <>
          <ProfilePicture user={user} />
          <h1 className="user">{user.name}</h1>
          <p className="text">{props.text}</p>
          <div className="footer-container">
            <p className="date">{date_formated}</p>
            <div className="like-comments">
              {comments.length === 0 ? (
                <></>
              ) : (
                <p className="click-comments" onClick={showComments}>
                  {comments.length} Comments
                </p>
              )}

              <div className="like-container">
                {likeButton}
                {likes}
              </div>
            </div>
          </div>
          <div className="add-comment-container">
            <ProfilePicture user={curUser} />
            <textarea
              id="comment"
              placeholder="Add Comment"
              type="text"
              onChange={(e) => {
                setComment(e.target.value);
              }}
              name="comment"
            />
            <svg
              onClick={postComment}
              className="post-btn"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22 2 11 13"></path>
              <path d="m22 2-7 20-4-9-9-4 20-7z"></path>
            </svg>
          </div>
          {showCommentsPost}
          {err.map((err, i) => (
            <div key={i} className="err-cont">
              <p className="error-msg">{err.message}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PostCard;
