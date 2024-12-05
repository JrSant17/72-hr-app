import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import CreateAccount from "./CreateAccount";
import Login from "./Login";
import Inventory from "./Inventory";
import Visitor from './Visitor';
import './App.css'

function App() {
  const [userId, setUserId] = useState(null);




  return (
    <Routes>
      <Route path="/" element={<CreateAccount />} />
      <Route path="/login" element={<Login setUserId={setUserId} />} />
      <Route path="/inventory" element={<Inventory userId={userId} />} />
      <Route path="/visitor" element={<Visitor />} />
    </Routes>
  );
}


export default App
