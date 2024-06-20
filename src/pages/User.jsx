import './User.sass'
import UserRank from "../assets/rank.png"
import Border from "../assets/border.png"
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function User({ checkBalance }) {
    const user = window.Telegram.WebApp.initDataUnsafe.user;
    const firstLetter = user?.username ? user.username.charAt(0).toUpperCase() : 'U';
    const [balance, setBalance] = useState(null);
    const [userPhoto, setUserPhoto] = useState()

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

        const fetchUserPhoto = async (user) => {
            try {
                const response = await axios.get(`https://api.telegram.org/bot6455228955:AAHV4ZE3rtxuw04a7XF2C9Em3HCaW4hTmXw/getUserProfilePhotos?user_id=${user.id}`);
                const photos = response.data.result.photos;
                if (photos.length > 0) {
                    const fileId = photos[0][0].file_id;
                    const fileResponse = await axios.get(`https://api.telegram.org/bot6455228955:AAHV4ZE3rtxuw04a7XF2C9Em3HCaW4hTmXw/getFile?file_id=${fileId}`);
                    const filePath = fileResponse.data.result.file_path;
                    const photoUrl = `https://api.telegram.org/file/bot6455228955:AAHV4ZE3rtxuw04a7XF2C9Em3HCaW4hTmXw/${filePath}`;
                    setUserPhoto(photoUrl);
                }
            } catch (error) {
                console.error('Error fetching user photo', error);
            }
        };

        if (!user) {
            fetchUserData();
        }
        fetchUserPhoto(user)

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
