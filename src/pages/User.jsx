import './User.sass'
import UserRank from "../assets/rank.png"
import Border from "../assets/border.png"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useInitData } from '@vkruglikov/react-telegram-web-app';

export default function User({ checkBalance }) {
    // Получение данных пользователя из Telegram WebApp
    const user = window.Telegram.WebApp.initDataUnsafe.user;
    const [initDataUnsafe] = useInitData();
    const firstLetter = user?.username ? user.username.charAt(0).toUpperCase() : 'U';
    const [balance, setBalance] = useState(null);
    const [userPhoto, setUserPhoto] = useState(user ? `https://api.telegram.org/bot6455228955:AAHV4ZE3rtxuw04a7XF2C9Em3HCaW4hTmXw/getUserProfilePhotos?user_id=${user.id}` : null)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // const response = await axios.get(`http://localhost:3000/getUser/${user.id}`);

                const response = await axios.get(`http://localhost:3000/getUser/1234`);
                console.log(response.data.balance);
                setBalance(response.data.balance);
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };

        if (!user) {
            fetchUserData();
        }

    }, [user, checkBalance]);

    const formattedBalance = balance !== null ? parseFloat(balance.toFixed(3)).toLocaleString('en-US') : '0';

    return (
        <div className="User">
            <div className="avatarContainer">
                {userPhoto ?
                    <img className='avatar' src={userPhoto} alt={user?.username || 'User Avatar'} />
                    :
                    <span className="avatarFallback">
                        {firstLetter}
                    </span>
                }
                <p style={{ fontSize: 34 + 'px', backgroundColor: 'red', marginTop: 200 + 'px' }}>url: {userPhoto ? 'yes' : 'no'}</p>
                <img className='rank' src={UserRank} alt="Rank" />
                <img src={Border} className='border' alt="Border" />
            </div>
            <h3>{user?.username || 'Username'}</h3>
            <h2>{formattedBalance}</h2>
        </div>
    );
}
