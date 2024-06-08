import Home from "./pages/home/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { useExpand, useThemeParams } from '@vkruglikov/react-telegram-web-app';



function App() {
  const [isExpanded, expand] = useExpand();
  const { tg } = useThemeParams();

  useEffect(() => {
    !isExpanded && expand()
    tg.headerColor("#000000")
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
