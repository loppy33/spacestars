import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { useEffect } from 'react';

import { useExpand, useThemeParams } from '@vkruglikov/react-telegram-web-app';

function App() {
  const [isExpanded, expand] = useExpand();

  useEffect(() => {
    !isExpanded && expand()
  }, [])


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/spacestars/" element={<Home />} />
        {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}


export default App
