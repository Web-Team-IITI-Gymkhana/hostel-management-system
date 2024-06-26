import React from 'react'
import SwapStudentRoom from './SwapStudentRoom'
import AlotEmptyRoomToStudent from './AlotEmptyRoomToStudent'
import UpdateRoomDetails from './UpdateRoomDetails'

export default function Actions() {
  return (
    <div className='p-3'>
        <div className='text-2xl'>Actions</div>
      <SwapStudentRoom/>
      <AlotEmptyRoomToStudent/>
      <UpdateRoomDetails/>
    </div>
  )
}
