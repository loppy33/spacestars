import './starships.sass';
import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

import Rocket1 from '../../../../assets/rocket1.png';
import Rocket2 from '../../../../assets/rocket2.png';
import Rocket3 from '../../../../assets/rocket3.png';
import Rocket4 from '../../../../assets/rocket4.png';
import Rocket5 from '../../../../assets/rocket5.png';
import Rocket6 from '../../../../assets/rocket6.png';
import Rocket7 from '../../../../assets/rocket7.png';
import Rocket8 from '../../../../assets/rocket8.png';
import Rocket9 from '../../../../assets/rocket9.png';
import Rocket10 from '../../../../assets/rocket10.png';

export default function Starships() {
    const queryClient = useQueryClient();
    const userId = window.Telegram.WebApp.initDataUnsafe.user.id;


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

    const levels = [
        { level: 1, price: 1000 },
        { level: 2, price: 10000 },
        { level: 3, price: 100000 },
        { level: 4, price: 200000 },
        { level: 5, price: 400000 },
        { level: 6, price: 800000 },
        { level: 7, price: 1600000 },
        { level: 8, price: 3200000 },
        { level: 9, price: 6400000 },
        { level: 10, price: 12800000 }
    ];

    const { data: userData, isLoading, error } = useQuery(['user', userId], () =>
        axios.get(`http://38.180.23.221:3000/api/users/getUser/${userId}`).then(res => res.data)
    );

    const mutation = useMutation(
        ({ price, level }) =>
            axios.post('http://38.180.23.221:3000/api/farming/buyRocket', {
                id: userId,
                lvl: level,
                price: price
            }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['user', userId]);
            },
        }
    );

    const handleBuy = (price, level) => {
        if (userData.balance >= price) {
            mutation.mutate({ price, level });
        } else {
            alert('Insufficient balance to buy this rocket.');
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading user data</div>;

    return (
        <ul className="Starships">
            {rockets.map((rocket, index) => {
                const level = index + 1;
                const rocketPrice = levels.find(item => item.level === level)?.price || 0;
                // Проверяем, является ли ракета "owned" (уже купленной)
                if (userData.lvl > level) {
                    return null; // Если ракета уже куплена, пропускаем её
                }

                return (
                    <li key={index} className={userData.lvl >= level ? 'buyed' : ''}>
                        <img src={rocket} alt={`Rocket ${level}`} />
                        <p>Galaxy ship <br />
                            {userData.lvl >= level ? (
                                <span>Level {level}</span>
                            ) : (
                                <span>{rocketPrice.toLocaleString('en-US')} PN</span>
                            )}
                        </p>
                        {userData.lvl === level ? (
                            <button>Selected</button>
                        ) : userData.lvl > level ? (
                            <button>Owned</button>
                        ) : (
                            <button onClick={() => handleBuy(rocketPrice, level)}>Buy</button>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
