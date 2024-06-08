import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import { useEffect, useState } from 'react';

import { useExpand, useThemeParams } from '@vkruglikov/react-telegram-web-app';

function App() {
  const [isExpanded, expand] = useExpand();
  const [colorScheme, themeParams] = useThemeParams();

  useEffect(() => {
    !isExpanded && expand()
    themeParams.bg_color = "#000000"
  }, [])


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/spacestars/" element={<Home isExpanded={isExpanded}/>} />
        {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
