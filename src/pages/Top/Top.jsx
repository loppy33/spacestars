import './Top.sass';
import { Swiper, SwiperSlide } from 'swiper/react';
import UserAvatar from '../../assets/icons/userAvatr.png';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import leftArrow from '../../assets/icons/arrowPrev.png';
import rightArrow from '../../assets/icons/arrowNext.png';
import Top1 from '../../assets/icons/top1.png';
import Top2 from '../../assets/icons/top2.png';
import Top3 from '../../assets/icons/top3.png';
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { WebAppProvider, BackButton } from '@vkruglikov/react-telegram-web-app';

import Bronze from '../../assets/bronze.png';
import Silver from '../../assets/silver.png';
import Gold from '../../assets/gold.png';
import Platinum from '../../assets/platinum.png';
import SpaceStar from '../../assets/cosmo.png';


export default function Top() {
    let navigate = useNavigate();
    const sliderRef = useRef(null);
    const [categories, setCategories] = useState({
        Bronze: [],
        Silver: [],
        Gold: [],
        Platinum: [],
        SpaceStar: []
    });

    useEffect(() => {
        async function fetchTopUsers() {
            try {
                const response = await fetch('http://localhost:3000/api/users/top');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching top users:', error);
            }
        }

        fetchTopUsers();
    }, []);

    const renderUser = (user, index) => (
        <li key={user.id}>
            <div className="info">
                <img src={user.avatar} alt="" />
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
                <ul>
                    {users.map((user, index) => renderUser(user, index))}
                </ul>
            </div>
        </SwiperSlide>
    );

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
