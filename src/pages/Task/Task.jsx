import './Task.sass';
import User from "../User";
import SpaceTask from './components/spacetask/spacetask';
import { WebAppProvider, BackButton } from '@vkruglikov/react-telegram-web-app';
import { useNavigate } from "react-router-dom";

export default function Task() {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/`;
        navigate(path);
    }

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
                        <button className="tasks active">Space Tasks</button>
                        <button className="achivment">Achivment</button>
                    </div>
                    <SpaceTask />
                </div>
                {/* Здесь мы вызываем функцию routeChange */}
                <BackButton onClick={routeChange} />
            </div>
        </WebAppProvider>
    );
}
