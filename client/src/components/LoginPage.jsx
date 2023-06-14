import React, { useState } from 'react';
import { useAuth } from './auth';

export default function LoginPage() {
  const auth = useAuth();
  const [userName, setUserName] = useState('');

  const login = (e) => {
    e.preventDefault();
    auth.login(userName);
    alert('Login successful');
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={login}>
        <label>Username</label>
        <input value={userName} onChange={(e) => setUserName(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
