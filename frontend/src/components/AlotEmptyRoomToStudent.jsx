import { useState, useContext } from 'react'
import ProfileContext from '../context/ProfileContext';

export default function AlotEmptyRoomToStudent() {
  let {getAlotStudentData,alotStudentData,setAlotStudentData} = useContext(ProfileContext)
  const [isClosed, setIsClosed] = useState(true);
  const [firstSwap, setFirstSwap] = useState(false);
  const handleClosed = () => {
    setIsClosed(!isClosed);
  };
  const handleSubmit = (e) => {
    console.log(firstSwap)
    if(!firstSwap){
        e.preventDefault();
        getAlotStudentData(e);
    }
    else{
        handleBack();
    }
    setFirstSwap(true);
  };
  const handleBack = () =>{
    setAlotStudentData(null)
    setFirstSwap(false);
  };
  return (
    <div className='m-4 rounded-md hover:border-gray-400 border-2 shadow-md transition-all w-max min-w-[50%]'>
        <div onClick={handleClosed} className='mx-4 p-3 text-xl'>
            Alot an Empty room to student
        </div>
    {isClosed? <div></div> :
      <div>
        <hr/>
        <form onSubmit={handleSubmit} className='p-2 px-3'>
          <div className='flex justify-start items-center'>
            <div className='p-2'>
              Email ID of Student: 
            </div>
            <div className='p-2'>
              <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Email of Student"/>
            </div>
          </div>
          <div className='flex justify-end items-center'>
            <button type='submit' className={`p-2 hover:bg-green-400 rounded-md px-3 transition-all duration-800 border hover:text-white`}>
              {firstSwap? <div>Back</div>
              : <div>Verify Email</div>
              }
            </button>
          </div>
        </form>
      </div>
    }
    </div>
  )
}
