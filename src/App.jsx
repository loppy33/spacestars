import Home from "./pages/Home/Home"
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
