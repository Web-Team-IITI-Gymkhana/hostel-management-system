import { useState,useContext } from 'react'
import ProfileContext from '../context/ProfileContext';
import Cookies from "js-cookie";

export default function SwapStudentRoom() {
    let {getSwapStudentsData,swapStudentData1,swapStudentData2, setSwapStudentData1, setSwapStudentData2,confirmSwap} = useContext(ProfileContext)
    const [hovered, setHovered] = useState(false);
    const [firstSwap, setFirstSwap] = useState(false);
    const [isClosed, setIsClosed] = useState(true);
    const handleSubmit = (e) => {
        console.log(firstSwap)
        if(!firstSwap){
            e.preventDefault();
            getSwapStudentsData(e);
        }
        else{
            handleBack();
        }
        setFirstSwap(true);
    };
    const handleClosed = () => {
        setIsClosed(!isClosed);
    };
    const handleBack = () =>{
        setSwapStudentData1(null);
        setSwapStudentData2(null);
        Cookies.remove('swapStudentData1')
        Cookies.remove('swapStudentData2')
        setFirstSwap(false);
    };
  return (
    <div className='m-4 rounded-md hover:border-gray-400 border-2 shadow-md transition-all w-max min-w-[50%]'>
        <div onClick={handleClosed} className='mx-4 p-3 text-xl'>
            Swap Rooms of 2 Students
        </div>
        {isClosed ? <div></div>
        :
        <div>
        <hr />
        <form onSubmit={handleSubmit} className='flex justify-between items-center'>
            <div className="p-2 mx-2">
                {!firstSwap ?  
                <div className='m-2'>
                    <input type="email" name="email1" id="email1" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Email of 1st Student"/>
                </div>
                :
                <div>
                {swapStudentData1!=null ? 
                    <div className='flex flex-col'>
                        <div>Hostel = {swapStudentData1.hostel}</div>
                        <div>Roll No. = {swapStudentData1.roll_no}</div>
                        <div>Room No. = {swapStudentData1.room_no}</div>
                    </div>
                    :
                    <div>No or Wrong Email Id provided</div>
                }
                </div>
                }
            </div>
            <button onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} type='submit' className={`p-2 m-3 hover:bg-green-400 rounded-md px-3 transition-all duration-800 border hover:text-white`}>
            {firstSwap ? <div onClick={confirmSwap} className={` ${hovered ? 'text-white' : 'text-black'} flex justify-between items-center`}>
                <div className='p-2'>
                    Confirm Exchange
                </div>
                <div>
                    <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            d="M21 7.5L8 7.5M21 7.5L16.6667 3M21 7.5L16.6667 12"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ stroke: hovered ? 'white' : 'black' }}
                        />
                        <path
                            d="M4 16.5L17 16.5M4 16.5L8.33333 21M4 16.5L8.33333 12"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ stroke: hovered ? 'white' : 'black' }}
                        />
                    </svg>
                </div>
            </div> : 
            <div>Verify Email</div>}
            </button>
            <div className="p-2 mx-2">
                {!firstSwap ?  
                <div className='m-2'>
                    <input type="email" name="email2" id="email2" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Email of 2nd Student"/>
                </div>
                :
                <div>
                {swapStudentData2!=null ? 
                    <div className='flex flex-col'>
                        <div>Hostel = {swapStudentData2.hostel}</div>
                        <div>Roll No. = {swapStudentData2.roll_no}</div>
                        <div>Room No. = {swapStudentData2.room_no}</div>
                    </div>
                    :
                    <div>No or Wrong Email Id provided</div>
                }
                </div>
                }
            </div>
        </form>
        {firstSwap ? 
        <div className='w-full flex justify-end'>
            <div onClick={handleBack} className='w-min p-2 px-3 m-2 rounded-md hover:bg-green-400 hover:text-white border'>Back</div>
        </div>
        :
        <div></div>
        }
        </div>
        }

    </div>
  )
}
