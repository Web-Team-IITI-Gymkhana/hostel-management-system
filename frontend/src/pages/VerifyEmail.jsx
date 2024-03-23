import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Navigate } from 'react-router';
import { css } from '@emotion/react';
import { ScaleLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
`;

export default function VerifyEmail() {
  let { str } = useParams();
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/dj-rest-auth/registration/verify-email/', { key: str });
        if (response.status === 200) {
          console.log('Email verification successful');
          setRedirect('/auth');
        } else {
          console.error('Email verification failed');
          setRedirect('/auth');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error verifying email:', error);
        setLoading(false);
      }
    };
    verifyEmail();
  }, [str]);

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <ScaleLoader color="#4a90e2" loading={loading} css={override} size={150} />
      {loading && <p className="text-gray-500 text-xl ml-4">Verifying Email...</p>}
    </div>
  );
}
