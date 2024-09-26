import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import Dashboard from './component/pages/Dashboard'
import Signup from './component/pages/Signup'

import { ToastContainer} from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';



const App = () => {
  return (
    <div className='App' >
     <ToastContainer/>
    <Router>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/> 
      </Routes>
    </Router>
    </div>
  )
}

export default App