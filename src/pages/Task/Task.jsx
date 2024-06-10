import './Task.sass';
import User from "../User";
import SpaceTask from './components/spacetask/spacetask';
import { WebAppProvider, BackButton } from '@vkruglikov/react-telegram-web-app';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Achivment from './components/achivment/achivment';

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
            <div className="Task">
                <div className="container">
                    <User />
                    <div className="choice">
                        <button className={choice ? 'tasks active' : 'tasks'} onClick={() => setChoice(true)}>Space Tasks</button>
                        <button className={choice ? 'achivment' : 'achivment active'} onClick={() => setChoice(false)}>Achivment</button>
                    </div>
                    {
                        choice ?
                            <>
                                <SpaceTask />
                            </>
                            :
                            <>
                                <Achivment />
                            </>
                    }
                </div>
                <BackButton onClick={routeChange} />
            </div>
        </WebAppProvider>
    );
}
