import { useState, useContext, useEffect } from 'react'
import ProfileContext from '../context/ProfileContext';
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function AlotEmptyRoomToStudent() {
  let {getAlotStudentData,getEmptyRooms,alotStudentToEmptyRoom} = useContext(ProfileContext)
  let [alotStudentData, setAlotStudentData] = useState(null);
  let [emptyRoomData, setEmptyRoomData] = useState(null);
  const [isClosed, setIsClosed] = useState(true);
  const [firstSwap, setFirstSwap] = useState(false);
  const [floorCounts, setFloorCounts] = useState({});
  const [generatedRooms, setGeneratedRooms] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const handleClick = (unitNumber) => {
    setSelectedUnit(unitNumber);
  };
  const handleFinalClick = (room) => {
    if (selectedUnit && alotStudentData.email){
      console.log(selectedUnit,room,alotStudentData.email)
      alotStudentToEmptyRoom(selectedUnit, room, alotStudentData.email);
    }
  };
  const handleClosed = () => {
    setIsClosed(!isClosed);
  };

  const setCookieData = () => {
    const alotStudentDataStr = Cookies.get("alotStudentData");
    const emptyRoomDataStr = Cookies.get("emptyRoomDetails");
    const floorCountsStr = Cookies.get("floorCounts");
    if(alotStudentDataStr){
      setAlotStudentData(JSON.parse(alotStudentDataStr));
    }
    if(emptyRoomDataStr){
      const parsedEmptyRoomData = JSON.parse(emptyRoomDataStr);
      setEmptyRoomData(parsedEmptyRoomData);
      if(floorCountsStr){
        setFloorCounts(JSON.parse(floorCountsStr).floorCounts);
      } 
      else{
        const newFloorCounts = {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0
        };
        Object.keys(parsedEmptyRoomData?.EmptyRoomDetails).forEach(floorNumber => {
          const floor = floorNumber[0];
          const emptyRooms = Object.keys(parsedEmptyRoomData?.EmptyRoomDetails[floorNumber]).length;
          newFloorCounts[floor] += emptyRooms;
        });
        setFloorCounts(newFloorCounts);
        Cookies.set('floorCounts', JSON.stringify({ floorCounts: newFloorCounts }), { expires: 365, path: "/" });
      }
    }
  };

  useEffect(() => {
    setCookieData();
    const checkCookieChanges = () => {
      const currentEmptyRoomDataStr = Cookies.get("emptyRoomDetails");
      const currentAlotStudentDataStr = Cookies.get("alotStudentData"); 
      const currentFloorCountsStr = Cookies.get("floorCounts");
      let currentEmptyRoomData = null;
      let currentAlotStudentData = null; 
      let currentFloorCounts = null;
      if(currentEmptyRoomDataStr){currentEmptyRoomData = JSON.parse(currentEmptyRoomDataStr);}
      if(currentAlotStudentDataStr){currentAlotStudentData = JSON.parse(currentAlotStudentDataStr);}
      if(currentFloorCountsStr){currentFloorCounts = JSON.parse(currentFloorCountsStr);}
      // console.log(currentEmptyRoomData,currentAlotStudentData,currentFloorCounts);
      if(currentEmptyRoomData !== emptyRoomData || currentAlotStudentData !== alotStudentData || currentFloorCounts!==floorCounts){
          setEmptyRoomData(currentEmptyRoomData);
          setAlotStudentData(currentAlotStudentData);
          setFloorCounts(currentFloorCounts);
          setCookieData();
      } 
      else {
        console.log("Empty room data cookie is not set or is empty.");
      }
    };
    const interval = setInterval(checkCookieChanges, 1000);
    return () => clearInterval(interval);
  }, []);

  const generateRoomsForFloor = (floor) => {
    const units = {};
    for (let i = 1; i <= 18; i++) {
      const unitNumber = `${floor}${i.toString().padStart(2, '0')}`;
      const emptyRoomsData = emptyRoomData?.EmptyRoomDetails?.[unitNumber];
      const emptyRoomsCount = emptyRoomsData ? Object.keys(emptyRoomsData).length : 0;
      units[unitNumber] = emptyRoomsCount;
    }
    setGeneratedRooms(units);
  };

  const handleSubmit = (e) => {
    if(!firstSwap){
        getAlotStudentData(e);
    }
    else{
        handleBack(e);
    }
    setFirstSwap(true);
  };
  const handleBack = (e) =>{
    e.preventDefault();
    Cookies.remove('alotStudentData')
    Cookies.remove('emptyRoomDetails')
    Cookies.remove('floorCounts')
    setAlotStudentData(null);
    setEmptyRoomData(null);
    setFloorCounts(null);
    setGeneratedRooms([]);
    setFirstSwap(false);
    setSelectedUnit(null);
  };
  // const handleSelectClicked = () =>{
  //   getEmptyRooms();
  // }
  return (
    <div className='m-4 rounded-md hover:border-gray-400 border-2 shadow-md transition-all w-max min-w-[50%]'>
        <div onClick={handleClosed} className='mx-4 p-3 text-xl'>
            Alot an Empty room to student
        </div>
    {isClosed? <div></div> :
      <div>
        <hr/>
        <form onSubmit={handleSubmit} className='p-2 px-3'>
        {firstSwap ? <div>
          {alotStudentData ? <div>
            <div>Hostel: {alotStudentData.hostel}</div>
            <div>Room No: {alotStudentData.room_no}</div>
            <div>Roll No: {alotStudentData.roll_no}</div>
          </div>
          :
          <div>
            No student found
          </div>}
        </div>
        :
        <div className='flex justify-start items-center'>
          <div className='p-2'>
            Email of the Student:
          </div>
          <div className='p-2'>
            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Email of Student"/>
          </div>
        </div>
        }
        {floorCounts &&
          <div className='mt-4'>
            <h3 className='text-lg font-semibold px-2'>Available Rooms: </h3>
            <div className='grid grid-cols-6'>
              {Object.keys(floorCounts).map(floor => (
                <button
                  type='button' 
                  key={floor} 
                  onClick={() => floorCounts[floor] ? generateRoomsForFloor(floor): toast.error('No rooms available')} 
                  className={`flex flex-col p-2 m-2 border rounded-md transition-all duration-200 min-w-[100px] items-center hover:cursor-pointer ${floorCounts[floor] ? 'bg-green-400 text-white' : 'bg-red-400 text-white'}`}
                >
                  <div className='text-2xl focus:outline-none'>
                    Floor {floor-1}
                  </div>
                  <div className='text-sm'>
                    {floorCounts[floor] ? `${floorCounts[floor]} rooms available` : 'Not available'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        }
        {Object.keys(generatedRooms).length > 0 && (
          <div className='mt-4'>
            <h3 className='text-lg font-semibold px-2'>Available Rooms for Selected Floor:</h3>
            <div className='grid grid-cols-6'>
              {Object.keys(generatedRooms).map(unitNumber => (
                <button type='button' onClick={()=>{generatedRooms[unitNumber] ? handleClick(unitNumber) : toast.error('No rooms available')}} key={unitNumber} className={`p-2 m-2 border rounded-md ${generatedRooms[unitNumber] > 0 ? 'bg-green-400' : 'bg-red-400'} text-white`}>
                  <div className='text-xl'>{unitNumber}</div>
                  <div className='text-sm'>
                    {generatedRooms[unitNumber] ? `${generatedRooms[unitNumber]} rooms available` : 'Not available'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        {selectedUnit && (
          <div className='mt-4'>
            <h3 className='text-lg font-semibold px-2'>{`Rooms for Unit ${selectedUnit}:`}</h3>
            <div className='grid grid-cols-6'>
              {/* Iterate through rooms A to F */}
              {['A', 'B', 'C', 'D', 'E', 'F'].map(room => (
                <button type='button' onClick={()=>{handleFinalClick(room)}} key={room} className={`p-2 m-2 border rounded-md ${emptyRoomData?.EmptyRoomDetails[selectedUnit][room] === 'Empty' ? 'bg-green-400' : 'bg-red-400'} text-white`}>
                  {selectedUnit+ " " +room}
                </button>
              ))}
            </div>
          </div>
        )}
          <div className='flex justify-end items-center'>
              {firstSwap? 
                <div className='flex justify-end items-center'>
                <div className='mx-2'>
                  { alotStudentData && !emptyRoomData &&                
                    <div onClick={getEmptyRooms} className='p-2 hover:bg-green-400 rounded-md px-3 transition-all duration-800 border hover:text-white'>
                      <div>Select Room</div>
                    </div> }
                </div>
                <button onClick={handleBack} className={`ml-2 p-2 hover:bg-green-400 rounded-md px-3 transition-all duration-800 border hover:text-white`}>
                  <div>Back</div>
                </button>
                </div>
              : 
                <button type='submit' className={`p-2 hover:bg-green-400 rounded-md px-3 transition-all duration-800 border hover:text-white`}>
                  <div>Verify Email</div>
                </button>
              }
          </div>
        </form>
      </div>
    }
    </div>
  )
}
