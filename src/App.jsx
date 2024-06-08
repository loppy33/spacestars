import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import { useEffect, useState } from 'react';

import { useExpand, useThemeParams } from '@vkruglikov/react-telegram-web-app';

function App() {
  const expand = useExpand()

  useEffect(() => {
    expand()
  }, [])


  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
