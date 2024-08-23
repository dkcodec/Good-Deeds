'use client';

import React, { useEffect, useState } from 'react';

interface Deed {
  description: string;
  userId: string;
}

interface User {
  _id: string;
  username: string;
  tag?: string;
  friends: string[];
  deeds: Deed[];
}

const UserPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    const fetchUser = async (id: string) => {
      try {
        const res = await fetch(`http://localhost:3001/users/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch user with id ${id}`);
        }
        const data: User = await res.json();
        setUser(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    const userId = '66c845cc5fce7c67aa5e739c';
    fetchUser(userId);
  }, []);

  const handleCreateUser = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error('Failed to register user');
      }

      const newUser: User = await res.json();
      setUser(newUser);
      setUsername('');
      setPassword('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <form onSubmit={handleCreateUser}>
        <input
          className='text-black'
          placeholder="User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className='text-black'
          placeholder="User Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Tag:</strong> {user.tag || 'No tag available'}</p>
      <p><strong>Friends:</strong> {user.friends.join(', ') || 'No friends found'}</p>
    </div>
  );
};

export default UserPage;
