import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfilePicture from '../HelperComponents/ProfilePicture';

const MessagesPop = ({ open }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [conversations, setConversations] = useState();

  useEffect(() => {
    fetch(`/conversation/get_all_conversations/${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'done') {
          //   console.log(data);
          setConversations(data.conversations);
        }
      });
  }, [user._id]);

  return (
    <>
      {open === false ? (
        <></>
      ) : (
        <div className="profile-box" id="profile-pic">
          <ul>
            {conversations === undefined || conversations.length === 0 ? (
              <li>You have no chats</li>
            ) : (
              conversations.map((data) => {
                const lastMessage = data.messages[data.messages.length - 1];
                // console.log(data);
                const otherUser = data.users.filter(
                  (val) => val._id !== user._id
                );
                console.log(lastMessage);
                console.log(user._id);

                return (
                  <li key={data._id}>
                    {
                      <ProfilePicture
                        user={otherUser[0]}
                        cClass="conversation-pic"
                      />
                    }
                    <div className="message-info">
                      <p className="user-name">{otherUser[0].name}</p>
                      <p className="user-message">
                        {lastMessage.senderId === user._id ? <>You: </> : <></>}
                        {lastMessage.message}
                      </p>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default MessagesPop;
