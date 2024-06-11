import './Garage.sass';
import { WebAppProvider, BackButton } from '@vkruglikov/react-telegram-web-app';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Rockets from './components/rockets/rockets';
import Starships from './components/starships/starships';

import Rocket from '../../assets/rocket.png'
import Money from '../../assets/money.png'

export default function Task() {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/spacestars/`;
        navigate(path);
    }

    const [choice, setChoice] = useState(true)

    return (
        <WebAppProvider
            options={{
                smoothButtonsTransition: true,
            }}
        >
            <div className="Garage">
                <div className="container">
                    <div className="infoContainer">
                        <h2 className='money'><img src={Money} alt="" /> 50,094.434 PN</h2>
                        <img className='rocket' src={Rocket} alt="" />

                    </div>
                    <div className="choice">
                        <button className={choice ? 'rockets active' : 'rockets'} onClick={() => setChoice(true)}>Rockets</button>
                        <button className={choice ? 'starships' : 'starships active'} onClick={() => setChoice(false)}>Starships</button>
                    </div>
                    {
                        choice ?
                            <>
                                <Rockets />
                            </>
                            :
                            <>
                                <Starships />
                            </>
                    }
                </div>
                {/* Здесь мы вызываем функцию routeChange */}
                <BackButton onClick={routeChange} />
            </div>
        </WebAppProvider>
        
    );
}
