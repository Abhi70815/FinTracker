import React, { useEffect } from 'react'
import './style.css'
import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { IoMdPerson } from "react-icons/io";


const Header = () => {

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }

  }, [user, loading])

  function logoutFnc() {
    try {
      
      signOut(auth).then(() => {
        toast.success("Logged out Successfully!");
        navigate('/');
        // Sign-out successful.
      }).catch((e) => {
        toast.error(e.message);
        // An error happened.
      });

    } catch (error) {

    }
  }
  return (
    <div className='navbar'>
      <p className='logo'>FinTracker</p>
      {user &&
        <div style={{display:"flex", alignItems:"center", gap:"0.5rem"}}>
          <img src={user.photoURL ? user.photoURL : '/public/Abhi .jpg'} alt="x" height="35px" width="35px" style={{borderRadius:"50%"}}/>
        <p onClick={logoutFnc} className='link'>Logout</p>
        </div>
        }
    </div>
  )
}

export default Header