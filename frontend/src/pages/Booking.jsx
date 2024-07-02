import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import hostelImage from '../images/hostel_image.png';
import guestHouseImage from '../images/guest_house_image.png';

function Booking() {
  const { user } = useContext(AuthContext);
  // Logic for Hostel floor Layout will be used later
  // const [hoveredUnit, setHoveredUnit] = useState(null);

  // const handleHoverChange = (unitLabel) => {
  //   setHoveredUnit(unitLabel);
  // };
  return (
    <div className='h-screen'>
      {user && <div className='text-2xl p-3 mx-auto w-max'>Hi {user.username}, Welcome to Room Booking Services!!</div>}
      <div className='h-3/4 w-screen flex items-center justify-center relative'>
        {/* Hostel Booking Option */}
        <div className='absolute left-0 w-1/2 h-full flex justify-center items-center'
          style={{
            backgroundImage: `url(${hostelImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.8
          }}>
          <div className='relative z-1 bg-green-400 hover:bg-green-500 w-max p-3 rounded-md text-xl text-white cursor-pointer'>Book a Room in Hostel</div>
        </div>
        {/* Guest Room Booking Option */}
        <div className='absolute right-0 w-1/2 h-full flex justify-center items-center'
          style={{
            backgroundImage: `url(${guestHouseImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.8
          }}>
          <div className='bg-green-400 hover:bg-green-500 w-max p-3 rounded-md mx-auto text-xl text-white relative z-10 cursor-pointer'>Book a Room in Guest Room</div>
        </div>
      </div>
      {/*Logic for Hostel floor Layout will be used later*/}
      {/* <div className='flex'>
      <div className="p-4">
          <HostelFloorLayout
            hoveredUnit={hoveredUnit}
            setHoveredUnit={handleHoverChange}
          />
        </div>
        <div className='p-4'>
        {hoveredUnit && (
          <div className="p-4 text-center font-bold text-2xl">
            Hovered Unit: {hoveredUnit}
          </div>
        )}
        </div>
      </div> */}
    </div>
  );
}

export default Booking;
