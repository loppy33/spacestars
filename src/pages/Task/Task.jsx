import './Task.sass'
import User from "../User";
import SpaceTask from './components/spacetask/spacetask';
import { BackButton } from '@vkruglikov/react-telegram-web-app';

export default function Task() {
    return (
        <div className="Task">
            <div className="container">
                <BackButton onClick={() => console.log('Hello, I am back button!')} />;
                <User />

                <div className="choice">
                    <button className="tasks active">Space Tasks</button>
                    <button className="achivment">Achivment</button>
                </div>
                <SpaceTask />
            </div>
        </div>
    )
}