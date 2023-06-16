import React, { createContext, useContext, useState } from 'react';

// React Router
import { useNavigate, Navigate } from 'react-router-dom';

const users = [
  {
    username: 'yuyi',
    isAdmin: true,
    password: '123',
    favoriteWorkouts: [
      'https://youtu.be/vHWvMTIGJEQ',
      'https://youtu.be/cmRz6Q8DOrA',
    ],
  },
  { username: 'irene', isAdmin: true, password: '123', favoriteWorkouts: [] },
  { username: 'steph', isAdmin: false, password: '123', favoriteWorkouts: [] },
  {
    username: 'sofia',
    isAdmin: false,
    password: '123',
    favoriteWorkouts: [
      'https://youtu.be/qw32DPzSEHo',
      'https://youtu.be/ZvQ-5ad-6Qo',
    ],
  },
];

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

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

  const login = (username, password) => {
    const user = users.find((user) => user.username === username);

    if (!user) {
      console.log('The user is not registered');
      navigate('/signup');
      return;
    } else {
      if (user.password !== password) {
        console.log('Incorrect password');
        return;
      }
      setUser(user);
    }

    navigate('/profile');
  };

  const logout = () => {
    setUser(null);
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
