import React from 'react';
import { useAuth } from './auth';

export default function LogoutPage() {
  const auth = useAuth();

  const logout = (e) => {
    auth.logout();
    alert('Logged out');
  };
  return (
    <>
      <h1>Logout</h1>
      <form onSubmit={logout}>
        <label>Are you sure?</label>
        <button type="submit">Logout</button>
      </form>
    </>
  );
}
