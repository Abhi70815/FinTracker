import React from 'react'
import Header from '../Header'
import SignupSignInComponent from '../SignupSignin'

const Signup = () => {
  return (
    <div>
      <Header/>
      <div className='wrapper'>
        <SignupSignInComponent/>
      </div>
    </div>
  )
}

export default Signup