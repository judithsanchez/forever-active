import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// React Router
import { useNavigate, Navigate } from 'react-router-dom';

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [signupResponse, setSignupResponse] = useState({
    status: null,
    message: null,
  });
  const [loginResponse, setLoginResponse] = useState({
    status: null,
    message: null,
    isUsernameCorrect: null,
    isPasswordCorrect: null,
  });

  const [resetPasswordResponse, setResetPasswordResponse] = useState({
    status: null,
    message: null,
  });

  const [addFavoriteWorkoutResponse, setAddFavoriteWorkoutResponse] = useState({
    status: null,
    message: null,
  });

  const [removeFavoriteWorkoutResponse, setRemoveFavoriteWorkoutResponse] =
    useState({
      status: null,
      message: null,
    });

  const signup = async (username, password) => {
    try {
      const response = await axios.post(
        'api/users/signup',
        { username: username, password: password },
        { method: 'POST' }
      );
      setSignupResponse({
        status: response.data.status,
        message: response.data.message,
      });
      navigate('/login');
      alert('Your registration was successful.');
    } catch (error) {
      setSignupResponse({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/users/login', {
        username: username,
        password: password,
      });

      // Store the token locally
      localStorage.setItem('token', response.data.token);
      console.log(response.data.message, response.data.token);
      const requestedData = await requestData();
      setUser(requestedData); // Update the user state
      setLoginResponse({
        status: response.data.status,
        message: response.data.message,
      });
      navigate('/profile');
    } catch (error) {
      setLoginResponse({
        status: error.response.status,
        message: error.response.data.message,
        isUsernameCorrect: error.response.data.isCorrectUsername,
        isPasswordCorrect: error.response.data.isCorrectPassword,
      });
    }
  };

  const requestData = async () => {
    try {
      const { data } = await axios('/api/users/profile', {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      // console.log(data);
      setData(data);
      return data;
    } catch (error) {
      // console.log(error.message);
      setData(error.message);

      return null; // Return null or handle the error appropriately
    }
  };

  const resetPassword = async (username, newPassword) => {
    // console.log(username, newPassword);
    try {
      const response = await axios.patch(
        'api/users/reset-password',
        { username: username, password: newPassword },
        { method: 'PATCH' }
      );
      setResetPasswordResponse({
        status: response.data.status,
        message: response.data.message,
      });
      alert('Password change succesful');
    } catch (error) {
      setResetPasswordResponse({
        status: error.response.status,
        message: error.response.data.message,
      });
      alert('User not found');
      navigate('/signup');
      setResetPasswordResponse({
        status: null,
        message: null,
      });
    }
  };

  const addFavoriteWorkout = async (id, workout) => {
    try {
      const response = await axios.patch('/api/users/add-favorite-workout', {
        id,
        favoriteWorkouts: [workout],
      });
      setAddFavoriteWorkoutResponse({
        status: response.status,
        message: response.data.message,
      });
      setUser((prevUser) => ({
        ...prevUser,
        favoriteWorkouts: response.data.favoriteWorkouts,
      }));
    } catch (error) {
      setAddFavoriteWorkoutResponse({
        status: error.status,
        message: error.message,
      });
    }
  };

  const removeFavoriteWorkout = async (id, workout) => {
    try {
      const response = await axios.patch('/api/users/remove-favorite-workout', {
        id,
        favoriteWorkouts: [workout],
      });
      setRemoveFavoriteWorkoutResponse({
        status: response.status,
        message: response.data.message,
      });
      setUser((prevUser) => ({
        ...prevUser,
        favoriteWorkouts: response.data.favoriteWorkouts,
      }));
    } catch (error) {
      setRemoveFavoriteWorkoutResponse({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setData(null);
    setSignupResponse({
      status: null,
      message: null,
    });
    setSignupResponse({
      status: null,
      message: null,
      isUsernameCorrect: null,
      isPasswordCorrect: null,
    });
    navigate('/');
  };

  const auth = {
    user,
    login,
    loginResponse,
    signup,
    signupResponse,
    resetPassword,
    resetPasswordResponse,
    addFavoriteWorkout,
    addFavoriteWorkoutResponse,
    removeFavoriteWorkout,
    removeFavoriteWorkoutResponse,
    logout,
  };

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
