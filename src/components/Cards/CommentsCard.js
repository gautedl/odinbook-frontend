import { useState } from 'react';
import { Link } from 'react-scroll';
import CommentCard from './CommentCard';

const CommentsCard = ({ comments, numComments = 5, postId }) => {
  const [num, setNum] = useState(numComments);
  const slicedArray = comments.slice(0, num);

  const showMore = () => {
    setNum(num + 5);
  };

  return (
    <>
      {slicedArray.map((comment) => (
        <CommentCard
          key={comment._id}
          text={comment.text}
          user={comment.user}
          createdAt={comment.createdAt}
          likedByUser={comment.likedByUser}
          likes={comment.likes}
          id={comment._id}
        />
      ))}
      <div className="comment-footer">
        <p className="comment-link" onClick={showMore}>
          Show more comments
        </p>
        <Link to={`comment-${postId}`} spy={true} smooth={true}>
          <p className="comment-link">Post Comment</p>
        </Link>
      </div>
    </>
  );
};

export default CommentsCard;
