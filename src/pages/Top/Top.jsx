import './Top.sass'
import { Swiper, SwiperSlide } from 'swiper/react';
import UserAvatar from '../../assets/icons/userAvatr.png'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';

import leftArrow from '../../assets/icons/arrowPrev.png'
import rightArrow from '../../assets/icons/arrowNext.png'
import Rank from '../../assets/rank.png'

import Top1 from '../../assets/icons/top1.png'
import Top2 from '../../assets/icons/top2.png'
import Top3 from '../../assets/icons/top3.png'


import { useNavigate } from "react-router-dom";

import { useRef } from 'react';

import { WebAppProvider, BackButton } from '@vkruglikov/react-telegram-web-app';



export default function Top() {
    const sliderRef = useRef(null);
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/spacestars/`;
        navigate(path);
    }

    return (
        <WebAppProvider
            options={{
                smoothButtonsTransition: true,
            }}
        >
            <div className="Top">
                <div className="container">

                    <Swiper ref={sliderRef}
                        spaceBetween={30}
                        navigation={{
                            nextEl: '.swiper-button-next-custom',
                            prevEl: '.swiper-button-prev-custom',
                        }}
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <div className='topContainer'>
                                <img src={Rank} alt="" />
                                <h1>Major Sr</h1>
                                <p>50,094.434/100,000,000</p>
                                <span className='lvlbar'></span>
                                <ul>
                                    <li>
                                        <div className="info">
                                            <img src={UserAvatar} alt="" />
                                            <p>Andrew Anubis <br /> <span>11,323,432 PN</span></p>
                                        </div>

                                        <img className='top' src={Top1} alt="" />
                                    </li>
                                    <li>
                                        <div className="info">
                                            <img src={UserAvatar} alt="" />
                                            <p>Andrew Anubis <br /> <span>11,323,432 PN</span></p>
                                        </div>

                                        <img className='top' src={Top2} alt="" />

                                    </li>
                                    <li>
                                        <div className="info">
                                            <img src={UserAvatar} alt="" />
                                            <p>Andrew Anubis <br /> <span>11,323,432 PN</span></p>
                                        </div>

                                        <img className='top' src={Top3} alt="" />

                                    </li>
                                    <li>
                                        <div className="info">
                                            <img src={UserAvatar} alt="" />
                                            <p>Andrew Anubis <br /> <span>11,323,432 PN</span></p>
                                        </div>

                                        <span className='toprank'>4</span>
                                    </li>
                                    <li>
                                        <div className="info">
                                            <img src={UserAvatar} alt="" />
                                            <p>Andrew Anubis <br /> <span>11,323,432 PN</span></p>
                                        </div>

                                        <span className='toprank'>5</span>
                                    </li>
                                    <li>
                                        <div className="info">
                                            <img src={UserAvatar} alt="" />
                                            <p>Andrew Anubis <br /> <span>11,323,432 PN</span></p>
                                        </div>

                                        <span className='toprank'>6</span>
                                    </li>
                                </ul>
                                <div className="userInfo">
                                    <div className="info">
                                        <img src={UserAvatar} alt="" />
                                        <p>Andrew Anubis <br /> <span>23,432 PN</span></p>
                                    </div>

                                    <span>23111</span>
                                </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>Slide 2</SwiperSlide>
                        <SwiperSlide>Slide 3</SwiperSlide>
                        <SwiperSlide>Slide 4</SwiperSlide>
                        <SwiperSlide>Slide 5</SwiperSlide>
                        <div className="swiper-button-prev-custom">
                            <img src={leftArrow} alt="Previous" />
                        </div>
                        <div className="swiper-button-next-custom">
                            <img src={rightArrow} alt="Next" />
                        </div>
                    </Swiper>
                </div>
                <BackButton onClick={routeChange} />
            </div>
        </WebAppProvider>
    )
}