import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAuth from '../contexts/auth';
import { createUserDocument } from '../util/firebase';

const Signin: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line
  const { googleSignIn, user } = UserAuth() as {
    googleSignIn: () => Promise<void>;
    user: any; // eslint-disable-line
  };
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      }
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      const signin = async () => {
        await handleGoogleSignIn();
      };
      signin();
    }
  }, []);

  useEffect(() => {
    const createUser = async () => {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      if (user != null && Object.keys(user).length > 0) {
        try {
          await createUserDocument(user, {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            role: 'user',
            createdAt: new Date().toISOString(),
          });
          navigate('/dashboard');
        } catch (err) {
          console.error('Error creating user document:', err);
          if (err instanceof Error) {
            setError(err.message);
          }
        }
      }
    };
    createUser();
  }, [user]);

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>{isLoading ? <p>Loading auth...</p> : <p>Auth complete!</p>}</div>
  );
};

export default Signin;
