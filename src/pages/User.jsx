import './User.sass'
import UserRank from "../assets/rank.png"
import Border from "../assets/border.png"

export default function User() {
    // Получение данных пользователя из Telegram WebApp
    const user = window.Telegram.WebApp.initDataUnsafe.user;
    const firstLetter = user?.username ? user.username.charAt(0).toUpperCase() : 'U';

    return (
        <div className="User">
            <div className="avatarContainer">
                {user?.photo_url ?
                    <img className='avatar' src={user.photo_url} alt={user?.username || 'User Avatar'} />
                    :
                    <span className="avatarFallback">
                        {firstLetter}
                    </span>
                }
                <img className='rank' src={UserRank} alt="Rank" />
                <img src={Border} className='border' alt="Border" />
            </div>
            <h3>{user?.username || 'Username'}</h3>
            <h2>50,094.434</h2>
        </div>
    );
}
