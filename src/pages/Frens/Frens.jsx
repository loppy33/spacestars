import './Frens.sass'
import FrensIcon from '../../assets/icons/frensIcon.png'
import TopIcon from '../../assets/icons/topicon.png'
import UserAvatar from '../../assets/icons/userAvatr.png'
import CopyImg from '../../assets/icons/copyImg.png'
import { useNavigate } from "react-router-dom";
import { WebAppProvider, BackButton } from '@vkruglikov/react-telegram-web-app';
import Footer from '../Home/components/footer/Footer'
import { useEffect, useState } from 'react'

import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function Frens() {
    const user = window.Telegram.WebApp.initDataUnsafe.user;
    const [friends, setFriends] = useState([]);
    const [refLink, setRefLink] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {

        const fetchFriends = async (id) => {
            try {
                const response = await fetch(`http://localhost:3000/getUserFriends/${id}`);
                const data = await response.json();
                setFriends(data.friends);
            } catch (error) {
                setFriends([]);
            }
        };

        fetchFriends(1234);
        // user.id

        const generateRefLink = () => {
            // setRefLink(`http://yourwebsite.com/signup?ref=${user.id}`);
            setRefLink(`http://yourwebsite.com/signup?ref=${1234}`);
        };

        generateRefLink();
    }, []);

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/spacestars/`;
        navigate(path);
    }

    function telegramForwardButton(url, text = 'Hello') {
        const share_url = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        return share_url
    }


    const handleCopy = () => {
        // Логика обработки копирования ссылки
        setCopySuccess(true); // Показываем уведомление

        // Устанавливаем таймер для скрытия уведомления через 3 секунды
        setTimeout(() => {
            setCopySuccess(false);
        }, 1000);
    };


    return (
        <WebAppProvider
            options={{
                smoothButtonsTransition: true,
            }}
        >
            <div className="Frens">
                <div className="container">
                    <div className="frensTitleContainer">
                        <img className='icon' src={FrensIcon} alt="" />
                        <h3>Invite frens, earn <br /> bonus</h3>
                        <button onClick={() => navigate('/spacestars/top')}><img src={TopIcon} alt="" /> Top 100</button>
                    </div>
                    <div className="inviteList">
                        <h2>Invite list <span>{friends.length} frens</span></h2>

                        <ul>
                            {friends.map((friend, index) => {
                                <li key={index}>
                                    <div className="info">
                                        <img src={UserAvatar} alt="" />
                                        <p>{friend.name || 'Unknown'} <br /> <span>Система статуса - {friend.balance || 0} PN</span></p>
                                    </div>
                                    <span>подсчет полученых очков от баланса друга PN</span>
                                </li>
                            })}
                            <li>
                                <div className="info">
                                    <img src={UserAvatar} alt="" />
                                    <p>Andrew Anubis <br /> <span>Silver - 23,432 PN</span></p>
                                </div>

                                <span>17,212 PN</span>
                            </li>
                        </ul>
                        <div className="btns">
                            <a className='invite' href={telegramForwardButton(refLink)}>Invite a fren</a>
                            <CopyToClipboard text={refLink}>
                                <button className="copy" onClick={handleCopy}>
                                    <img src={CopyImg} alt="" />
                                </button>
                            </CopyToClipboard>

                        </div>
                        <div className="copySuccess" style={copySuccess ? { opacity: 1 } : { opacity: 0 }}>Copied to clipboard!</div>
                    </div>
                    <Footer />
                </div>
                <BackButton onClick={routeChange} />
            </div>
        </WebAppProvider>
    )
}