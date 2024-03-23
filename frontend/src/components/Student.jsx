import React, { useContext, useEffect } from 'react';
import ProfileContext from '../context/ProfileContext';
function Student() {
  const { getStudentDue,getStudentRoom,student_room,student_due} = useContext(ProfileContext);
  useEffect(() => {
    if(!student_room){
      getStudentRoom();
    }
  }, [getStudentRoom]);

  useEffect(() => {
    if(!student_due){
      getStudentDue();
    }
  }, [getStudentDue]);

  return (
    <>
    <div className='w-[360px] h-64 rounded-lg p-6 border '>
       <p className='font-bold'>{student_room?.furniture}</p>
       <p className='font-bold'>{student_due?.student_due}</p>
    </div>
    <div className='w-[360px] h-64 rounded-lg p-6 border '>

    </div>
    </>
  )
}

export default Student