import { useState } from 'react';
import ProfilePicture from '../HelperComponents/ProfilePicture';

const CreatePost = ({ setDisplayedPosts, displayedPosts }) => {
  const [post, setPost] = useState();
  const [errorMsg, setErrorMsg] = useState([]);

  const token = `Bearer ${localStorage.getItem('token')}`;
  const input = document.getElementById('text');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      text: post,
    };
    fetch(
      `https://gautedl-odinbook.onrender.com/post/create_new_post/${user._id}`,
      {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
          //Authorization: token,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message !== 'posted') {
          setErrorMsg(data);
        }
        const updatedPosts = [...displayedPosts, data.post];
        setDisplayedPosts(updatedPosts);
        setPost('');
        input.value = '';
      });
  };

  return (
    <div className="create-post" id="create-post">
      <div className="create-post-container">
        <form className="post-form">
          <ProfilePicture user={user} />
          {/* Switch to <div contenteditable so rezise is smoother */}
          <textarea
            className="input"
            id="text"
            placeholder={`What's on your mind, ${user.name}`}
            name="text"
            onChange={(e) => {
              setPost(e.target.value);
            }}
            required
          />
        </form>
        <div className="btn-container">
          <button onClick={handleSubmit}>Post</button>
        </div>
        {errorMsg.map((err, i) => (
          <p className="error-msg" key={i}>
            {err.message}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CreatePost;
