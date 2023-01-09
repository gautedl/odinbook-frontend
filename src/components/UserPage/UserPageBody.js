const UserPageBody = ({ user }) => {
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const equalFriends = user.friends.filter((el) =>
    loggedInUser.friends.includes(el._id)
  );
};

export default UserPageBody;
