import React from 'react';
import Student from '../components/Student';
import PersonalDetails from '../components/PersonalDetails';
import ProfileComplains from '../components/ProfileComplains';
function Profile() {
  return (
    <>
      <div className='flex flex-col lg:grid lg:grid-cols-3'>
        <div className='px-3'>
          <PersonalDetails/>
        </div>
        <div className='px-3'>
          <Student/>
        </div>
        <div className='px-3'>
          <ProfileComplains/>
        </div>
      </div>
    </>
  );
}

export default Profile;