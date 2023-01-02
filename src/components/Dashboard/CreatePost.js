import { useState } from 'react';
import { defaultUserPic } from '../../assets/SVG/svg';

const CreatePost = (props) => {
  const [post, setPost] = useState();
  const [errorMsg, setErrorMsg] = useState([]);

  const token = `Bearer ${localStorage.getItem('token')}`;
  const input = document.getElementById('text');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      text: post,
    };
    fetch('/post/create_new_post', {
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data !== 'posted') {
          setErrorMsg(data);
        }
        setPost('');
        input.value = '';
      });
  };

  return (
    <div className="create-post">
      <div className="create-post-container">
        <form className="post-form">
          {defaultUserPic}
          {/* Switch to <div contenteditable so rezise is smoother */}
          <textarea
            className="input"
            id="text"
            placeholder={`What's on your mind, ${props.username}`}
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
            {err.msg}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CreatePost;
