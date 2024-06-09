import Home from "./pages/Home/Home"
import Task from "./pages/Task/Task"
import Frens from "./pages/Frens/Frens";
import Garage from "./pages/Garage/Garage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { useExpand, useThemeParams } from '@vkruglikov/react-telegram-web-app';

const tg = window.Telegram.WebApp

function App() {
  const [isExpanded, expand] = useExpand();

  useEffect(() => {
    !isExpanded && expand()
    tg.setHeaderColor("#000000")
  }, [])



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/spacestars/" element={<Home />} />
        <Route path="/spacestars/task" element={<Task />} />
        <Route path="/spacestars/frens" element={<Frens />} />
        <Route path="/spacestars/garage" element={<Garage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
