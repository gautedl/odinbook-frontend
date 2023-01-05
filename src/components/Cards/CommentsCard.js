import CommentCard from './CommentCard';

const CommentsCard = ({ comments }) => {
  return comments.map((comment) => (
    <CommentCard
      key={comment._id}
      text={comment.text}
      user={comment.user}
      createdAt={comment.createdAt}
      likedByUser={comment.likedByUser}
      likes={comment.likes}
      id={comment._id}
    />
  ));
};

export default CommentsCard;
