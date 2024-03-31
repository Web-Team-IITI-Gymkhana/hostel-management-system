import Student from '../components/Student';
import PersonalDetails from '../components/PersonalDetails';
import ProfileComplains from '../components/ProfileComplains';
import ProfileContext from '../context/ProfileContext';
import AuthContext from '../context/AuthContext';
import HostelStats from '../components/HostelStats';
import { useContext, useEffect, useState } from 'react';

function Profile() {
  const { user } = useContext(AuthContext);
  const { getStudentData, getWardenData, hostelStats } = useContext(ProfileContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.role === 'STUDENT' && loading) {
      getStudentData()
      setLoading(false);
    }
    if (user.role === 'WARDEN' && loading) {
      getWardenData()
      setLoading(false);
      if(!hostelStats){
        setLoading(true);
      }
    }
    // Add similar logic for other roles
  }, [user.role, getStudentData, getWardenData, loading, hostelStats]);

  return (
    <>
      {user.role === 'STUDENT' ? 
        <div className='flex flex-col lg:grid lg:grid-cols-3'>
          <div className='px-3'>
            <PersonalDetails />
          </div>
          {user.role === 'STUDENT' && !loading.student && (
            <div className='px-3'>
              <Student />
            </div>
          )}
          {/* Render components for other roles similarly */}
          <div className='px-3'>
            <ProfileComplains />
          </div>
        </div>
        :
        <div>
          <div className='text-center p-2 m-2 font-bold text-2xl'>ADMIN PANEL</div>
          <div className='grid grid-cols-3 m-4'>
            <div className='px-3'>
              <PersonalDetails />
            </div>
            <div className='px-3 col-span-2 border p-2 rounded-md shadow-md hover:shadow-xl transition-all duration-300'>
              <HostelStats/>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default Profile;
