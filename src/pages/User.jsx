import './User.sass';
import UserRank from '../assets/rank.png';
import Border from '../assets/border.png';

export default function User({ balance, userPhoto }) {
    const user = window.Telegram.WebApp.initDataUnsafe.user;
    const firstLetter = user?.username ? user.username.charAt(0).toUpperCase() : 'U';

    const formattedBalance = balance !== null ? parseFloat(balance.toFixed(3)).toLocaleString('en-US') : '0';

    return (
        <div className="User">
            <div className="avatarContainer">
                {userPhoto ? (
                    <img className='avatar' src={userPhoto} alt={user?.username || 'User Avatar'} />
                ) : (
                    <span className="avatarFallback">
                        {firstLetter}
                    </span>
                )}
                <img className='rank' src={UserRank} alt="Rank" />
                <img src={Border} className='border' alt="Border" />
            </div>
            <h3>{user?.username || 'Username'}</h3>
            <h2>{formattedBalance}</h2>
        </div>
    );
}
