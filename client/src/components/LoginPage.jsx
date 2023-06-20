import React, { useState, useEffect } from 'react';
import { useAuth } from './auth';
import { Navigate } from 'react-router-dom';

export default function LoginPage() {
  const auth = useAuth();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordForgotten, setIsPasswordForgotten] = useState(null);
  const [newPassword, setNewPassword] = useState('');

  const login = (e) => {
    e.preventDefault();
    auth.login(username, password);
  };

  const resetPassword = (e) => {
    e.preventDefault();
    auth.resetPassword(username, newPassword);
  };

  useEffect(() => {
    if (auth.resetPasswordResponse.status === 200) {
      setIsPasswordForgotten(false);
    }
  }, [auth.resetPasswordResponse]);

  useEffect(() => {
    if (auth.loginResponse.isPasswordCorrect === false) {
      alert(auth.loginResponse.message);
    }
  }, [auth.loginResponse]);

  if (auth.user) {
    return <Navigate to="/profile" />;
  }

  const handleUsernameChange = (e) => {
    const formattedUsername = e.target.value.trim().toLowerCase();
    setUserName(formattedUsername);
  };

  const handlePasswordChange = (e) => {
    const formattedPassword = e.target.value.replace(/\s/g, '');
    setPassword(formattedPassword);
  };

  const handleNewPasswordChange = (e) => {
    const formattedNewPassword = e.target.value.replace(/\s/g, '');
    setNewPassword(formattedNewPassword);
  };

  return (
    <>
      {!isPasswordForgotten && (
        <div>
          <h1>Login</h1>
          <form onSubmit={login}>
            <label>Username</label>
            <input value={username} onChange={handleUsernameChange} />
            <label>Password</label>
            <input
              value={password}
              onChange={handlePasswordChange}
              type="password"
            />
            <button type="submit">Login</button>
          </form>
          <button onClick={() => setIsPasswordForgotten(true)}>
            Forgot your password?
          </button>
        </div>
      )}
      {isPasswordForgotten && (
        <div>
          <form onSubmit={resetPassword}>
            <label>Username</label>
            <input value={username} onChange={handleUsernameChange} />
            <label>Type New Password</label>
            <input
              value={newPassword}
              onChange={handleNewPasswordChange}
              type="password"
            />
            <button type="submit">Reset Password</button>
          </form>
        </div>
      )}
    </>
  );
}
