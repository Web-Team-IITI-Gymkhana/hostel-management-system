import { useContext } from 'react';
import ProfileContext from '../context/ProfileContext';
function Student() {
  const { student_room,student_due} = useContext(ProfileContext);
  return (
    <>
    <div className='w-full h-max rounded-lg p-4 border my-4 shadow-md hover:shadow-xl transition-all duration-300'>
      <div className="text-xl font-medium">Furniture available in Your room:</div>
      <div>
          {student_room?.furniture?.map(item => (
            <p className='text-lg' key={item.id}>{item.name}</p>
          ))}
        </div>
        <hr className='my-3  border-gray-400 '/>
       <div className="text-xl font-medium">{"Hostel Dues (To be paid):"}</div>
       <p className='text-lg'>Rs.{student_due?.remaining_Due}/-</p>
    </div>
    </>
  )
}

export default Student