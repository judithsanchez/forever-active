import React from 'react';
import { useAuth } from './auth';

export default function ProfilePage() {
  const auth = useAuth();

  return (
    <>
      <h1>Profile</h1>
      <p>Welcome, {auth.user.userName}</p>
    </>
  );
}
