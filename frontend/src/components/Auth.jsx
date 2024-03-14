import AuthContext from '../context/AuthContext.jsx';
import React from 'react'
import { useState,useContext } from 'react'
import { Link } from "react-router-dom"

function Auth() {
    let {login,register,googleLogin} = useContext(AuthContext)
    const [signIn, setSignIn] = useState(true);
    const toggleSignIn = () => {
        setSignIn(!signIn);
        console.log("clicked")
    };
    return (
        <>
            <div className="mx-auto border border-black flex justify-center p-5">
            { signIn ?
                <div
                    className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8">
                    <form className="space-y-6" onSubmit={login}>
                        <h3 className="text-xl font-medium text-gray-900 text-center">Sign In to IITI Hostel</h3>
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Your email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@company.com" required=""/>
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2">Your password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required=""/>
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" required=""/>
                                </div>
                                <div className="text-sm ml-3">
                                    <label htmlFor="remember" className="font-medium text-gray-900">Remember me</label>
                                </div>
                            </div>
                                <a href="#" className="text-sm text-blue-700 hover:underline ml-auto">Lost
                                    Password?</a>
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login to your account</button>
                        <button onClick={googleLogin} className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-[18px] w-[18px] "/>Continue with
                            Google
                        </button>
                        <div className="text-sm font-medium text-gray-500">
                            Not registered? <a onClick={toggleSignIn} className="text-blue-700 hover:underline">Create
                                account</a>
                        </div>
                    </form>
                </div>
                :
                <div
                    className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8">
                    <form className="space-y-6" onSubmit={register}>
                        <h3 className="text-xl font-medium text-gray-900 text-center">Sign Up to IITI Hostel</h3>
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Your email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@company.com" required=""/>
                        </div>
                        <div>
                            <label htmlFor="text" className="text-sm font-medium text-gray-900 block mb-2">First Name</label>
                            <input type="text" name="fname" id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Jane" required=""/>
                        </div>
                        <div>
                            <label htmlFor="text" className="text-sm font-medium text-gray-900 block mb-2">Last Name</label>
                            <input type="text" name="lname" id="lname" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Doe" required=""/>
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2">Password</label>
                            <input type="password" name="password1" id="password1" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required=""/>
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2">Password (again):</label>
                            <input type="password" name="password2" id="password2" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required=""/>
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" required=""/>
                                </div>
                                <div className="text-sm ml-3">
                                    <label htmlFor="remember" className="font-medium text-gray-900">Remember me</label>
                                </div>
                            </div>
                                <a href="#" className="text-sm text-blue-700 hover:underline ml-auto">Lost
                                    Password?</a>
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign Up</button>
                        <button onClick={googleLogin} className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-[18px] w-[18px] "/>Continue with
                            Google
                        </button>
                        <div className="text-sm font-medium text-gray-500">
                            Already Have an account? <a onClick={toggleSignIn} className="text-blue-700 hover:underline">Sign In</a>
                        </div>
                    </form>
                </div>
            }
            </div>
        </> 
    )
}

export default Auth