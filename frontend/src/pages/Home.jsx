import React from 'react'
import AuthContext from '../context/AuthContext.jsx';
import { useContext } from 'react'
function Home() {
  let {user} = useContext(AuthContext)
  return (
    <div className='text-2xl'>{user ? "Hello " + user.email + "!!" : "home"}</div>
  )
}

export default Home