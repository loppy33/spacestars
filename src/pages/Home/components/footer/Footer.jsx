import './Footer.sass';
import { useHapticFeedback } from "@vkruglikov/react-telegram-web-app";

import Home from '../../../../assets/icons/home.png'
import Task from '../../../../assets/icons/task.png'
import Garage from '../../../../assets/icons/garage.png'
import Frens from '../../../../assets/icons/frens.png'

import { Link } from "react-router-dom";

export default function Footer() {
    const [impactOccurred, notificationOccurred, selectionChanged] = useHapticFeedback();

    return (
        <footer>
            <ul>
                <li className='active' onClick={() => selectionChanged()}>
                    <Link to="/spacestars/">
                        <img src={Home} alt="" />
                        <span className="text">Home</span>
                    </Link>
                </li>
                <li onClick={() => selectionChanged()}>
                    <Link to="/spacestars/task">
                        <img src={Task} alt="" />
                        <span className="text">Task</span>
                    </Link>
                </li>
                <li onClick={() => selectionChanged()}>
                    <Link to="/spacestars/garage">
                        <img src={Garage} alt="" />
                        <span className="text">Garage</span>
                    </Link>
                </li>
                <li onClick={() => selectionChanged()}>
                    <Link to="/spacestars/frens">
                        <img src={Frens} alt="" />
                        <span className="text">Frens</span>
                    </Link>
                </li>
            </ul>
        </footer>
    );
}
