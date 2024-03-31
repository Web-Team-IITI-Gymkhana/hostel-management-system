import { useContext } from 'react';
import ProfileContext from '../context/ProfileContext';

export default function ProfileComplains() {
  const { room_complaints } = useContext(ProfileContext);

  return (
    <div>
      <div className="w-full h-max rounded-lg p-4 border my-4 shadow-md hover:shadow-xl transition-all duration-300 text-xl font-semibold">
        Complaints:
        <div className='font-normal'>
          {room_complaints && room_complaints.room_complaints.map(complaint => (
            <div key={complaint.id}>
              <p><span className='font-semibold'>Complaint Type: </span>{complaint.complaint_type}</p>
              <p>{complaint.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
