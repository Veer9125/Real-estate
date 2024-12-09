import React from 'react'
import {Link} from 'react-router-dom';
function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4 focus:outline-none'>
        <input type="text" placeholder='username' className='border p-3 rounded-lg focus:outline-none' id='username' />
        <input type="text" placeholder='email' className='border p-3 rounded-lg focus:outline-none' id='email' />
        <input type="text" placeholder='password' className='border p-3 rounded-lg focus:outline-none' id='password' />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>SignUp</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an Account?</p>
      <Link to={"/sign-in"}>
      <span className='text-blue-700'>SignIn</span>
      </Link>
      </div>
      
    </div>
  )
}

export default SignUp
