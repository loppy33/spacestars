import './Top.sass';
import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { WebAppProvider, BackButton } from '@vkruglikov/react-telegram-web-app';
import UserAvatar from '../../assets/icons/userAvatr.png'; // Ensure the path is correct
import leftArrow from '../../assets/icons/arrowPrev.png';
import rightArrow from '../../assets/icons/arrowNext.png';
import Top1 from '../../assets/icons/top1.png';
import Top2 from '../../assets/icons/top2.png';
import Top3 from '../../assets/icons/top3.png';
import Bronze from '../../assets/bronze.png';
import Silver from '../../assets/silver.png';
import Gold from '../../assets/gold.png';
import Platinum from '../../assets/platinum.png';
import SpaceStar from '../../assets/cosmo.png';
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchUserPhotoAndUsername = async (userId) => {
    try {
        const response = await axios.get(`https://api.telegram.org/botYOUR_BOT_TOKEN/getUserProfilePhotos?user_id=${userId}`);
        const photos = response.data.result.photos;
        let photoUrl = UserAvatar; // Default avatar
        if (photos.length > 0) {
            const fileId = photos[0][0].file_id;
            const fileResponse = await axios.get(`https://api.telegram.org/botYOUR_BOT_TOKEN/getFile?file_id=${fileId}`);
            const filePath = fileResponse.data.result.file_path;
            photoUrl = `https://api.telegram.org/file/botYOUR_BOT_TOKEN/${filePath}`;
        }

        const userResponse = await axios.get(`https://api.telegram.org/botYOUR_BOT_TOKEN/getChat?chat_id=${userId}`);
        const username = userResponse.data.result.username || userResponse.data.result.first_name || 'Unknown';

        return { photoUrl, username };
    } catch (error) {
        console.error('Error fetching user data', error);
        return { photoUrl: UserAvatar, username: 'Unknown' }; // Fallback to default values
    }
};

const fetchTopUsers = async () => {
    const response = await fetch('http://localhost:3000/api/users/top');
    if (!response.ok) {
        throw new Error('Failed to fetch top users');
    }
    return response.json();
};

export default function Top() {
    const navigate = useNavigate();
    const sliderRef = useRef(null);

    const { data: categories, isLoading, isError } = useQuery('topUsers', fetchTopUsers);

    const renderUser = (user, index) => (
        <li key={user.id}>
            <div className="info">
                <img src={user.avatar || UserAvatar} alt="" />
                <p>{user.name} <br /> <span>{user.balance.toLocaleString('en-US')} PN</span></p>
            </div>
            {index < 3 ? <img className='top' src={[Top1, Top2, Top3][index]} alt="" /> : <span className='toprank'>{index + 1}</span>}
        </li>
    );

    const categoryLogos = {
        Bronze,
        Silver,
        Gold,
        Platinum,
        SpaceStar
    };

    const renderCategory = (categoryName, users) => (
        <SwiperSlide key={categoryName}>
            <div className='topContainer'>
                <div className="rankContainer">
                    <div className="swiper-button-prev-custom">
                        <img src={leftArrow} alt="Previous" />
                    </div>
                    <img className='rankImg' src={categoryLogos[categoryName]} alt="" />
                    <div className="swiper-button-next-custom">
                        <img src={rightArrow} alt="Next" />
                    </div>
                </div>
                <h1>{categoryName}</h1>
                {/* <p>123/123</p>
                <span className='lvlbar'></span> */}
                <ul>
                    {users.map((user, index) => renderUser(user, index))}
                </ul>
                <div className="userInfo">
                    <div className="info">
                        <img src={UserAvatar} alt="" />
                        <div>
                            <p>UserName</p>
                            <span>23,435 PN</span>
                        </div>
                    </div>
                    <span>ЗДЕСЬ МЕСТО В ТОПЕ</span>
                </div>
            </div>
        </SwiperSlide>
    );

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching data</p>;

    return (
        <WebAppProvider options={{ smoothButtonsTransition: true }}>
            <div className="Top">
                <div className="container">
                    <Swiper
                        ref={sliderRef}
                        spaceBetween={30}
                        navigation={{
                            nextEl: '.swiper-button-next-custom',
                            prevEl: '.swiper-button-prev-custom',
                        }}
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        {Object.entries(categories).map(([categoryName, users]) => renderCategory(categoryName, users))}
                    </Swiper>
                </div>
                <BackButton onClick={() => navigate('/spacestars/frens')} text="Back" />
            </div>
        </WebAppProvider>
    );
}
