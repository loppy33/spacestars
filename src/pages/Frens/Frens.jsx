import './Frens.sass';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { WebAppProvider, BackButton } from '@vkruglikov/react-telegram-web-app';
import Footer from '../Home/components/footer/Footer';
import CopyImg from '../../assets/icons/copyImg.png';
import FrensIcon from '../../assets/icons/frensIcon.png';
import TopIcon from '../../assets/icons/topicon.png';
import UserAvatar from '../../assets/icons/userAvatr.png'; // Ensure the path is correct
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useQuery, useMutation } from 'react-query';

const fetchUserFriends = async (userId) => {
    const response = await fetch(`http://localhost:3000/getUserFriends/${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user friends');
    }
    return response.json();
};

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

export default function Frens() {
    const user = window.Telegram.WebApp.initDataUnsafe.user || 1234;
    const navigate = useNavigate();
    const [refLink, setRefLink] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);

    const { data: friendsData, isLoading, isError, refetch: refetchFriends } = useQuery(['userFriends', user.id], () => fetchUserFriends(user.id), {
        enabled: !!user.id,
        refetchOnWindowFocus: false,
    });

    const { mutate: generateRefLink } = useMutation(() => {
        setRefLink(`http://yourwebsite.com/signup?ref=${user.id}`);
    });

    const { mutate: copyToClipboard } = useMutation(() => {
        setCopySuccess(true);
        setTimeout(() => {
            setCopySuccess(false);
        }, 1000);
    });

    const telegramForwardButton = (url, text = 'Hello') => {
        const share_url = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        return share_url;
    };

    useEffect(() => {
        if (user.id) {
            generateRefLink();
        }
    }, [user.id, generateRefLink]);

    const handleCopy = () => {
        copyToClipboard();
        navigator.clipboard.writeText(refLink);
    };

    const routeChange = () => {
        navigate('/spacestars/top');
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
                        <button onClick={routeChange}><img src={TopIcon} alt="" /> Top 100</button>
                    </div>
                    <div className="inviteList">
                        <h2>Invite list <span>{friendsData?.friends.length || 0} frens</span></h2>
                        <ul>
                            {friendsData?.friends.map((friend, index) => (
                                <li key={index}>
                                    <div className="info">
                                        <img src={friend.avatar || UserAvatar} alt="" />
                                        <p>{friend.name} <br /> <span>Система статуса - {friend.balance.toLocaleString('en-US')} PN</span></p>
                                    </div>
                                    <span>подсчет полученых очков от баланса друга PN</span>
                                </li>
                            ))}
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
    );
}
