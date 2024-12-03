import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import CreateAccount from "./CreateAccount";
import Login from "./Login";
import Inventory from "./Inventory";
import Visitor from './Visitor';

import './App.css'

function App() {
  // const [userAuth, setUserAuth] = useState(false)
  // const navigate = useNavigate()

  // useEffect(()=>{
  //   userAuth ? navigate('/home') : setUserAuth(false)
  // }, [userAuth])

  return (
    <Routes>
      <Route path="/" element={<CreateAccount />} />
      <Route path="/login" element = {<Login />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/visitor" element={<Visitor />} />
    </Routes>
  )
}

export default App