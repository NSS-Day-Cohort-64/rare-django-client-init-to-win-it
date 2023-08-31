import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../managers/UserManager';
import { getAuthorById } from '../../managers/UserManager';

export const UserProfile = ({ userId: userIdProp }) => {
  const [user, setUser] = useState({});
  const { userId: userIdParam } = useParams();
  const userId = userIdProp || userIdParam;

  useEffect(() => {
    getUserById(userId)
      .then(setUser);
  }, [userId]);

  return (
    <section className="post">
        <div className="user-list-name">Username: {user.username}</div>
        <div className="user-list-name">Name: {`${user.first_name} ${user.last_name}`}</div>
        <div className="user-list-name">Email: {user.email}</div>
    </section>
  );
};

export default UserProfile;
