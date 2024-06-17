import './Footer.sass';
import { useHapticFeedback } from "@vkruglikov/react-telegram-web-app";
import { Link, useLocation } from "react-router-dom";

import Home from '../../../../assets/icons/home.png';
import Task from '../../../../assets/icons/task.png';
import Garage from '../../../../assets/icons/garage.png';
import Frens from '../../../../assets/icons/frens.png';

export default function Footer() {
    const [impactOccurred, notificationOccurred, selectionChanged] = useHapticFeedback();
    const location = useLocation();

    return (
        <footer>
            <ul>
                <li className={location.pathname === "/spacestars/" ? 'active' : ''} onClick={() => selectionChanged()}>
                    <Link to="/spacestars/">
                        <img  src={Home} alt="Home" />
                        <span className="text">Home</span>
                    </Link>
                </li>
                <li className={location.pathname === "/spacestars/task" ? 'active' : ''} onClick={() => selectionChanged()}>
                    <Link to="/spacestars/task">
                        <img src={Task} alt="Task" />
                        <span className="text">Task</span>
                    </Link>
                </li>
                <li className={location.pathname === "/spacestars/garage" ? 'active' : ''} onClick={() => selectionChanged()}>
                    <Link to="/spacestars/garage">
                        <img src={Garage} alt="Garage" />
                        <span className="text">Garage</span>
                    </Link>
                </li>
                <li className={location.pathname === "/spacestars/frens" ? 'active' : ''} onClick={() => selectionChanged()}>
                    <Link to="/spacestars/frens">
                        <img src={Frens} alt="Frens" />
                        <span className="text">Frens</span>
                    </Link>
                </li>
            </ul>
        </footer>
    );
}
