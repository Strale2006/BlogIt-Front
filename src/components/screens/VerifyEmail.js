import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function VerifyEmail() {
  const { verificationToken } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(`/verifyEmail/${verificationToken}`);
        alert('Email verified');
      } catch (error) {
        console.error(error);
        alert('An error occurred');
      }
    };

    verifyEmail();
  }, [verificationToken]);

  return <div>Email verification in progress...</div>;
}

export default VerifyEmail;