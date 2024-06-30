import './Garage.sass';
import { WebAppProvider, BackButton } from '@vkruglikov/react-telegram-web-app';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useQuery } from 'react-query'; // Импорт useQuery из react-query
import Rockets from './components/rockets/rockets';
import Starships from './components/starships/starships';

import Rocket1 from '../../assets/rocket1.png';
import Rocket2 from '../../assets/rocket2.png';
import Rocket3 from '../../assets/rocket3.png';
import Rocket4 from '../../assets/rocket4.png';
import Rocket5 from '../../assets/rocket5.png';
import Rocket6 from '../../assets/rocket6.png';
import Rocket7 from '../../assets/rocket7.png';
import Rocket8 from '../../assets/rocket8.png';
import Rocket9 from '../../assets/rocket9.png';
import Rocket10 from '../../assets/rocket10.png';

import Money from '../../assets/money.png';
import Footer from '../Home/components/footer/Footer';
import axios from 'axios';

const rockets = [
    Rocket1,
    Rocket2,
    Rocket3,
    Rocket4,
    Rocket5,
    Rocket6,
    Rocket7,
    Rocket8,
    Rocket9,
    Rocket10
];

export default function Garage() {
    const user = window.Telegram.WebApp.initDataUnsafe.user;

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/spacestars/`;
        navigate(path);
    }

    const [choice, setChoice] = useState(true)

    // Используем useQuery для получения данных о балансе и уровне пользователя
    const { data: userData, isLoading, error } = useQuery('userData', async () => {
        const response = await axios.get(`http://38.180.23.221:3000/api/users/getUser/${user.id}`);
        return response.data;
    });

    if (isLoading) return <p>Loading...</p>; // Выводим загрузочное состояние, пока данные загружаются
    if (error) return <p>Error: {error.message}</p>; // Выводим ошибку, если запрос не удался

    const { balance, lvl } = userData; // Деструктурируем данные пользователя

    return (
        <WebAppProvider
            options={{
                smoothButtonsTransition: true,
            }}
        >
            <div className="Garage">
                <div className="container">
                    <div className="infoContainer">
                        <h2 className='money'><img src={Money} alt="" /> {balance.toLocaleString('en-US')} PN</h2>
                        {/* Заменяем Rocket на конкретное изображение ракеты, основываясь на уровне пользователя */}
                        <img className='rocket' src={rockets[lvl - 1]} alt={`Rocket ${lvl}`} />
                    </div>
                    <div className="choice">
                        <button className={choice ? 'rockets active' : 'rockets'} onClick={() => setChoice(true)}>Ammo - Weapon</button>
                        <button className={!choice ? 'starships active' : 'starships'} onClick={() => setChoice(false)}>Starships</button>
                    </div>
                    <div className="choiceContainer">
                        {choice ? (
                            <Rockets />
                        ) : (
                            <Starships />
                        )}
                    </div>
                </div>
                <Footer />
                <BackButton onClick={routeChange} />
            </div>
        </WebAppProvider>
    );
}
