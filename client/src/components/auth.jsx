import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// React Router
import { useNavigate, Navigate } from 'react-router-dom';

// const users = [
//   {
//     username: 'yuyi',
//     isAdmin: true,
//     password: '123',
//     favoriteWorkouts: [
//       'https://youtu.be/vHWvMTIGJEQ',
//       'https://youtu.be/cmRz6Q8DOrA',
//     ],
//   },
//   { username: 'irene', isAdmin: true, password: '123', favoriteWorkouts: [] },
//   { username: 'steph', isAdmin: false, password: '123', favoriteWorkouts: [] },
//   {
//     username: 'sofia',
//     isAdmin: false,
//     password: '123',
//     favoriteWorkouts: [
//       'https://youtu.be/qw32DPzSEHo',
//       'https://youtu.be/ZvQ-5ad-6Qo',
//     ],
//   },
// ];

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);

  const signup = (username, password) => {
    if (users.some((existingUser) => existingUser.username === username)) {
      console.log('The user is already registered');
      navigate('/login');
      return;
    }

    users.push({ username: username, isAdmin: false, password: password });
    console.log(users);
    navigate('/login');
  };

  const login = async (username, password) => {
    try {
      const { data } = await axios.post(
        '/api/users/login',
        {
          username: username,
          password: password,
        },
        {
          method: 'POST',
        }
      );

      //store it locally
      localStorage.setItem('token', data.token);
      console.log(data.message, data.token);

      const requestedData = await requestData();
      setUser(requestedData); // Update the user state
    } catch (error) {
      console.log(error);
      setData(error.message);
    }
    navigate('/profile');
  };

  const requestData = async () => {
    try {
      const { data } = await axios('/api/users/profile', {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      console.log(data);
      setData(data);
      return data;
    } catch (error) {
      console.log(error);
      setData(error.message);
      return null; // Return null or handle the error appropriately
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setData(null);
    navigate('/');
  };

  const auth = { user, login, logout, signup };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const auth = useContext(AuthContext);
  return auth;
}

function AuthRoute(props) {
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  return props.children;
}

export default AuthProvider;
export { useAuth, AuthRoute };
