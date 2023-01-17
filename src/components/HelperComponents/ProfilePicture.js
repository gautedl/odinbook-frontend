import { useEffect, useState } from 'react';
import { defaultUserPic } from '../../assets/SVG/svg';
import { Buffer } from 'buffer';
import { Link } from 'react-router-dom';

const ProfilePicture = ({
  user,
  id = '',
  showLink = true,
  cClass = 'profile-picture-div',
}) => {
  const [image, setImage] = useState();

  useEffect(() => {
    if (user.profilePicture) {
      const imageData = Buffer.from(user.profilePicture.data.data).toString(
        'base64'
      );

      const imageUrl = `data:${user.profilePicture.contentType};base64,${imageData}`;

      setImage(<img className="user-6123541" id={id} src={imageUrl} alt="" />);
    } else {
      setImage(defaultUserPic);
    }
  }, [user.profilePicture, id]);

  return (
    <>
      {showLink === true ? (
        <div className={cClass}>
          <Link to={`/user/page/${user._id}`}>{image}</Link>
        </div>
      ) : (
        <div className={cClass}>{image}</div>
      )}
    </>
  );
};

export default ProfilePicture;
