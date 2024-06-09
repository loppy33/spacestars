import './Task.sass'
import User from "../User";
import SpaceTask from './components/spacetask/spacetask';
import { BackButton } from '@vkruglikov/react-telegram-web-app';
import { useNavigate } from "react-router-dom";

export default function Task() {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/`;
        navigate(path);
    }
    return (
        <div className="Task">
            <div className="container">

                <User />

                <div className="choice">
                    <button className="tasks active">Space Tasks</button>
                    <button className="achivment">Achivment</button>
                </div>
                <SpaceTask />
            </div>
            <BackButton onClick={() => routeChange} />
        </div>
    )
}