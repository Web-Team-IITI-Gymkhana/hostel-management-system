import { useState } from 'react';

export default function SwapStudentRoom() {
    const [hovered, setHovered] = useState(false);
  return (
    <div className='shadow-lg m-4 w-max'>
        <div className='mx-4 p-2 text-xl'>
            Swap Rooms of Student
        </div>
        <hr />
        <div className='flex justify-center items-center'>
            <div className="p-2 mx-2">
                <div className='m-2'>
                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Email of 1st Student" required=""/>
                </div>
                <div className='m-2'>
                    <input type="text" name="unit" id="unit" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="314" required=""/>
                </div>
                <div className='m-2'>
                <select id="options" name="options" className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                </select>
                </div>
            </div>
            <button type='submit' className="p-2 m-3 hover:bg-green-400 rounded-2xl transition-all duration-800">
            <svg
                className={hovered ? 'text-white' : 'text-black'}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                width="50px"
                height="50px"
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
            </button>
            <div className="p-2 mx-2">
                <div className='m-2'>
                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Email of 2nd Student" required=""/>
                </div>
                <div className='m-2'>
                    <input type="text" name="unit" id="unit" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="314" required=""/>
                </div>
                <div className='m-2'>
                <select id="options" name="options" className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                </select>
                </div>
            </div>
        </div>
        <div className='text-red-500 px-4 py-2'>
            *IF NO STUDENT IS PRESENT IN A ROOM TO BE SWAPPED, LEAVE THE EMAIL BLANK
        </div>
    </div>
  )
}
