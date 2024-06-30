import './Top.sass';
import React, { useEffect, useRef, useState } from 'react';
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
        const response = await axios.get(`https://api.telegram.org/bot6455228955:AAHV4ZE3rtxuw04a7XF2C9Em3HCaW4hTmXw/getUserProfilePhotos?user_id=${userId}`);
        const photos = response.data.result.photos;
        let photoUrl = UserAvatar; // Default avatar
        if (photos.length > 0) {
            const fileId = photos[0][0].file_id;
            const fileResponse = await axios.get(`https://api.telegram.org/bot6455228955:AAHV4ZE3rtxuw04a7XF2C9Em3HCaW4hTmXw/getFile?file_id=${fileId}`);
            const filePath = fileResponse.data.result.file_path;
            photoUrl = `https://api.telegram.org/file/bot6455228955:AAHV4ZE3rtxuw04a7XF2C9Em3HCaW4hTmXw/${filePath}`;
        }

        const userResponse = await axios.get(`https://api.telegram.org/bot6455228955:AAHV4ZE3rtxuw04a7XF2C9Em3HCaW4hTmXw/getChat?chat_id=${userId}`);
        const username = userResponse.data.result.username || userResponse.data.result.first_name || 'Unknown';

        return { photoUrl, username };
    } catch (error) {
        console.error('Error fetching user data', error);
        return { photoUrl: UserAvatar, username: 'Unknown' }; // Fallback to default values
    }
};

const fetchUserPosition = async (userId) => {
    const response = await fetch(`http://38.180.23.221:3000/api/users/position/${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user position');
    }
    return response.json();
};


const fetchTopUsers = async () => {
    const response = await fetch('http://38.180.23.221:3000/api/users/top');
    if (!response.ok) {
        throw new Error('Failed to fetch top users');
    }
    return response.json();
};

export default function Top({ balance, userPhoto }) {
    const user = window.Telegram.WebApp.initDataUnsafe.user;
    const navigate = useNavigate();
    const sliderRef = useRef(null);
    const [userPosition, setUserPosition] = useState(null);

    const { data: categories, isLoading, isError } = useQuery('topUsers', fetchTopUsers);

    useEffect(() => {
        const fetchPosition = async () => {
            try {
                // const { position } = await fetchUserPosition(user.id);
                const { position } = await fetchUserPosition(user.id);
                setUserPosition(position);
            } catch (error) {
                console.error('Error fetching user position:', error);
            }
        };

        fetchPosition();
    }, []);
// }, [user.id]);

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
                        <img src={userPhoto ? userPhoto : UserAvatar} alt="" />
                        <div>
                            <p>{user?.username}</p>
                            <span>{balance} PN</span>
                        </div>
                    </div>
                    <span>{userPosition !== null ? userPosition : 'Loading...'}</span>
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
