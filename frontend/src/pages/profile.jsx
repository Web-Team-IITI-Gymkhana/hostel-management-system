import React, { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import ProfileContext from '../context/ProfileContext';

function Profile() {
  const { user } = useContext(AuthContext);
  const { student, getStudent } = useContext(ProfileContext);
  useEffect(() => {
    if(!student){
      getStudent();
    }
  }, [getStudent]);
  return (
    <>
<div className='flex flex-wrap'>
        <div className='w-[360px] h-[400px] mx-3 my-3 rounded-lg p-6 border-2 border-gray-500'>
          <p className='font-bold h-10'>Your Profile</p>
          <div className="inline-flex items-center justify-center w-20 h-20 overflow-hidden bg-orange-500 rounded-full">
            <span className="font-extrabold text-gray-600 dark:text-gray-300">CK</span>
          </div>
          <p className='font-medium'>{user.username}</p>
          <p className=''>Roll Number : {student?.roll_no}</p>
          <p className=''>Email: {user.email}</p>
          <p className=''>Department : {student?.department}</p>
          <hr className='my-3  border-gray-400 '/>
          <p className=' py-1'>Hostel Name : {student?.hostel}</p>
          <p className=' py-1'>Unit Number : {student?.room_no}</p>
          <p className=' py-1'>Room Type : {student?.room_no}</p>
        </div>
        <div className='w-[360px] mx-3 my-3 h-64 rounded-lg p-6 border '>

        </div>
      </div>
    </>
  );
}

export default Profile;