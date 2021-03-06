import { useState, useEffect } from 'react';
import axios from 'axios';

import Login from '../components/Admin/Login';
import Upload from '../components/Admin/Upload';

const Admin = () => {
  const [needLogin, setNeedLogin] = useState(false);
  const [user, setUser] = useState();

  const getUserHandler = async () => {
    try {
      const user = await axios.get('/api/v1/users/', { withCredentials: true });
      setUser(user.data.user);
    } catch (error) {
      setNeedLogin(true);
    }
  };

  useEffect(() => {
    getUserHandler();
  }, []);

  return (
    <>
      {needLogin ? (
        <Login setNeedLogin={setNeedLogin} setUser={setUser}></Login>
      ) : user ? (
        <>
          <p
            style={{
              marginTop: '25px',
              textAlign: 'center',
            }}
          >
            Your logged in as <strong>{user.username}</strong>
          </p>
          <Upload></Upload>
        </>
      ) : null}
    </>
  );
};

export default Admin;
