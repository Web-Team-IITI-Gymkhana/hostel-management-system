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
      <div className="text-xl">Furniture available in Your room:</div>
      <div>
          {student_room?.furniture.map(item => (
            <p key={item.id}>{item.name}</p>
          ))}
        </div>
       <div className="text-xl">{"Hostel Dues (To be paid):"}</div>
       <p className=''>{student_due?.remaining_Due}</p>
    </div>
    <div className='w-[360px] h-64 rounded-lg p-6 border '>

    </div>
    </>
  )
}

export default Student