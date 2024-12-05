import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import CreateAccount from "./CreateAccount";
import Login from "./Login";
import Inventory from "./Inventory";
import Visitor from './VisitorInventory';
import './App.css'
import InventoryDetails from './InventoryDetails';
import VisitorInventory from './VisitorInventory';
import VisitorInventoryDetails from './VisitorInventoryDetails';

function App() {
  const [userId, setUserId] = useState(null);




  return (
    <Routes>
      <Route path="/" element={<CreateAccount />} />
      <Route path="/login" element={<Login setUserId={setUserId} />} />
      <Route path="/inventory" element={<Inventory userId={userId} />} />
      <Route path="/visitor" element={<VisitorInventory />} />
      <Route path="/inventory/details/:itemId" element={<InventoryDetails />} />
      <Route path="/visitor/details/:itemId" element={<VisitorInventoryDetails />} />
    </Routes>
  );
}


export default App
