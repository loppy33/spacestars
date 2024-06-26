import './Task.sass';
import User from "../User";
import SpaceTask from './components/spacetask/spacetask';
import { WebAppProvider, BackButton } from '@vkruglikov/react-telegram-web-app';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Achivment from './components/achivment/achivment';
import Footer from '../Home/components/footer/Footer';

export default function Task({ balance, setBalance, userPhoto }) {
    let navigate = useNavigate();

    const routeChange = () => {
        let path = `/spacestars/`;
        navigate(path);
    }

    const [choice, setChoice] = useState(true);

    return (
        <WebAppProvider
            options={{
                smoothButtonsTransition: true,
            }}
        >
            <div className="Task">
                <div className="container">
                    <User balance={balance} userPhoto={userPhoto} />
                    <div className="choice">
                        <button className={choice ? 'tasks active' : 'tasks'} onClick={() => setChoice(true)}>Space Tasks</button>
                        <button className={!choice ? 'achivment active' : 'achivment'} onClick={() => setChoice(false)}>Achievement</button>
                    </div>
                    {choice ? (
                        <SpaceTask />
                    ) : (
                        <Achivment setBalance={setBalance} />
                    )}
                </div>
                <Footer />
                <BackButton onClick={routeChange} />
            </div>
        </WebAppProvider>
    );
}
