import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { useExpand, useThemeParams } from '@vkruglikov/react-telegram-web-app';

import Home from "./pages/home/Home";

function App() {
  const [isExpanded, expand] = useExpand();

  useEffect(() => {
    !isExpanded && expand()
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
