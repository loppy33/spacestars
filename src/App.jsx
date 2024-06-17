import Home from "./pages/Home/Home"
import Task from "./pages/Task/Task"
import Frens from "./pages/Frens/Frens";
import Garage from "./pages/Garage/Garage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useExpand } from '@vkruglikov/react-telegram-web-app';
import Top from "./pages/Top/Top";
import axios from 'axios';

const tg = window.Telegram.WebApp

function App() {
  const [isExpanded, expand] = useExpand();
  const [checkBalance, setCheckBalance] = useState(0)
  const user = window.Telegram.WebApp.initDataUnsafe.user;

  useEffect(() => {
    const addUser = async () => {
      // id: user.id
      try {
        const response = await axios.post('http://localhost:3000/addUser', {
          id: 1234,
          balance: 0.000,
          farmingTime: null,
          entryTime: new Date(),
          friends: []
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error adding user', error);
      }
    };

    if (!user) {
      addUser();
    }
  }, [user]);

  useEffect(() => {
    !isExpanded && expand()
    tg.setHeaderColor("#000000")
  }, [])



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/spacestars/" element={<Home checkBalance={checkBalance} setCheckBalance={setCheckBalance}/>} />
        <Route path="/spacestars/task" element={<Task />} />
        <Route path="/spacestars/frens" element={<Frens />} />
        <Route path="/spacestars/garage" element={<Garage />} />
        <Route path="/spacestars/top" element={<Top />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
