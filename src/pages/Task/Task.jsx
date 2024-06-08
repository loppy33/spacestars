import './Task.sass'
import User from "../User";
import SpaceTask from './components/spacetask/spacetask';

export default function Task() {
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
        </div>
    )
}