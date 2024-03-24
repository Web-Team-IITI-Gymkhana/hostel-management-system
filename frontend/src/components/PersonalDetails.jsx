import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import ProfileContext from '../context/ProfileContext';

export default function PersonalDetails() {
    const { user } = useContext(AuthContext);
    const { student, getStudentData} = useContext(ProfileContext);
    let [loading, setLoading] = useState(true);
    useEffect(() => {
      if(loading){
        getStudentData();
        setLoading(!loading);
      }
    }, [getStudentData, setLoading, loading]);
  return (
    <div className='w-full h-max rounded-lg p-4 border my-4 shadow-md hover:shadow-xl transition-all duration-300'>
        <p className='font-semibold h-10 text-xl'>Your Profile</p>
        <div className='flex gap-4 my-2 items-center'>
            <div className="flex items-center justify-center w-20 h-20 overflow-hidden bg-gray-500 rounded-full">
                <div className="font-semibold text-white dark:text-gray-300 text-3xl">{user.username.slice(0,1).toUpperCase()}</div>
            </div>
            <div>
                <p className='font-medium text-xl'>{user.username}</p>
                <p className=''>{user.email}</p>
            </div>
        </div>
        <div>
            <span className='text-md font-medium'>Roll Number : </span><span>{student?.roll_no}</span>
        </div>
        <div>
            <span className='text-md font-medium'>Department : </span><span>{student?.department}</span>
        </div>
        <div>
            <span className='text-md font-medium'>Hostel : </span><span>{student?.hostel}</span>
        </div>
        <div>
            <span className='text-md font-medium'>Room : </span><span>{student?.room_no?.slice(0,3) + " " + student?.room_no?.slice(3,4)}</span>
        </div>
        
        {/* <hr className='my-3  border-gray-400 '/> */}
        {/* <p className=''>Unit : {student?.room_no?.slice(0,3)}</p> */}
        {/* <p className=''>Room : {student?.room_no?.slice(3,4)}</p> */}
    </div>
  )
}
