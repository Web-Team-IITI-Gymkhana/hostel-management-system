import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className='flex flex-wrap'>
        <div className='w-[360px] h-[400px] mx-3 my-3 rounded-lg p-6 border '>
          <p className='font-bold h-10'>Your Profile</p>
          <div class="relative inline-flex items-center justify-center w-20 h-20 overflow-hidden bg-orange-500 rounded-full">
            <span class="font-extrabold text-gray-600 dark:text-gray-300">CK</span>
          </div>
          <p className='font-medium'>Chiranjivi Kehsav</p>
          <p className=''>Roll Number : 220001022</p>
          <p className=''>Email : cse220001022@iiti.ac.in</p>
          <p className=''>Department : CSE</p>
          <hr className='my-3  border-gray-400 '/>
          <p className=' py-1'>Hostel Name : VSB</p>
          <p className=' py-1'>Unit Number : 309</p>
          <p className=' py-1'>Room Type : D</p>
        </div>
        <div className='w-[360px] mx-3 my-3 h-64 rounded-lg p-6 border '>

        </div>
      </div>
    </>
  );
}

export default Profile;