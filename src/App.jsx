import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useExpand } from '@vkruglikov/react-telegram-web-app';
import axios from 'axios';

import Home from './pages/Home/Home';
import Task from './pages/Task/Task';
import Frens from './pages/Frens/Frens';
import Garage from './pages/Garage/Garage';
import Top from './pages/Top/Top';

const tg = window.Telegram.WebApp;

const fetchUserData = async (userId) => {
  const response = await axios.get(`http://38.180.23.221:3000/api/users/getUser/${userId}`);
  return response.data;
};

const fetchUserPhoto = async (userId) => {
  const response = await axios.get(`https://api.telegram.org/bot6455228955:AAHV4ZE3rtxuw04a7XF2C9Em3HCaW4hTmXw/getUserProfilePhotos?user_id=${userId}`);
  const photos = response.data.result.photos;
  if (photos.length > 0) {
    const fileId = photos[0][0].file_id;
    const fileResponse = await axios.get(`https://api.telegram.org/bot6455228955:AAHV4ZE3rtxuw04a7XF2C9Em3HCaW4hTmXw/getFile?file_id=${fileId}`);
    const filePath = fileResponse.data.result.file_path;
    const photoUrl = `https://api.telegram.org/file/bot6455228955:AAHV4ZE3rtxuw04a7XF2C9Em3HCaW4hTmXw/${filePath}`;
    return photoUrl;
  }
  return '';
};

const App = () => {
  
  const [isExpanded, expand] = useExpand();
  const user = tg.initDataUnsafe.user;
  const [balance, setBalance] = useState(0.000);
  const [userPhoto, setUserPhoto] = useState('');
  const [userLvl, setUserLvl] = useState(1);


  // Fetch user data using React Query
  // user.id
  const { data: userData } = useQuery(['userData', user?.id], () => fetchUserData(user.id), {
    enabled: !user,
    onError: (error) => {
      console.error('Error fetching user data', error);
    },
    onSuccess: (data) => {
      setBalance(data.balance);
      setUserLvl(data.lvl)
    },
  });

  // Fetch user photo using React Query
  // user.id
  const { data: userPhotoData } = useQuery(['userPhoto', user?.id], () => fetchUserPhoto(user.id), {
    enabled: !user,
    onSuccess: (data) => {
      setUserPhoto(data);
    },
    onError: (error) => {
      console.error('Error fetching user photo', error);
    },
  });

  useEffect(() => {
    if (!isExpanded) {
      expand();
    }
    tg.setHeaderColor('#000000');
  }, [isExpanded, expand, tg]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/spacestars/" element={<Home balance={balance} setBalance={setBalance} userPhoto={userPhotoData} />} />
        <Route path="/spacestars/task" element={<Task balance={balance} setBalance={setBalance} userPhoto={userPhotoData} />} />
        <Route path="/spacestars/frens" element={<Frens />} />
        <Route path="/spacestars/garage" element={<Garage balance={balance} setBalance={setBalance} userLvl={userLvl}/>} setUserLvl={setUserLvl} />
        <Route path="/spacestars/top" element={<Top balance={balance} userPhoto={userPhotoData}/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
