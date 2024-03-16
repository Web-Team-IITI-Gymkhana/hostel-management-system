import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className='text-2xl'>
      Hello {user.email} !!
    </div>
  );
}

export default Profile;