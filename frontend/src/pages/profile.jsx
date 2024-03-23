import React, { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import ProfileContext from '../context/ProfileContext';
import Student from '../components/Student';
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
      <div className='flex flex-wrap content-evenly'>
        <div className='w-[360px] h-[400px]  rounded-lg p-6 border '>
          <p className='font-bold h-10'>Your Profile</p>
          <div className="inline-flex items-center justify-center w-20 h-20 overflow-hidden bg-orange-500 rounded-full">
            <span className="font-extrabold text-gray-600 dark:text-gray-300">{user.username.slice(0,1)}</span>
          </div>
          <p className='font-medium'>{user.username}</p>
          <p className=''>Roll Number : {student?.roll_no}</p>
          <p className=''>Email: {user.email}</p>
          <p className=''>Department : {student?.department}</p>
          <hr className='my-3  border-gray-400 '/>
          <p className=' py-1'>Hostel Name : {student?.hostel}</p>
          <p className=' py-1'>Unit Number : {student?.room_no.slice(0,3)}</p>
          <p className=' py-1'>Room Type : {student?.room_no.slice(3,4)}</p>
        </div>
        <Student/>
      </div>
    </>
  );
}

export default Profile;