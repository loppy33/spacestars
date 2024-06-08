import './Footer.sass';
import { useHapticFeedback } from "@vkruglikov/react-telegram-web-app";

import Home from '../../../../assets/icons/home.png'
import Task from '../../../../assets/icons/task.png'
import Garage from '../../../../assets/icons/garage.png'
import Frens from '../../../../assets/icons/frens.png'

export default function Footer() {
    const [impactOccurred, notificationOccurred, selectionChanged] = useHapticFeedback();

    return (
        <footer>
            <ul>
                <li className='active'  onClick={() => selectionChanged()}>
                    <a>
                        <img src={Home} alt="" />
                        <span className="text">Home</span>
                    </a>
                </li>
                <li onClick={() => selectionChanged()}>
                    <a>
                        <img src={Task} alt="" />
                        <span className="text">Task</span>
                    </a>
                </li>
                <li  onClick={() => selectionChanged()}>
                    <a>
                        <img src={Garage} alt="" />
                        <span className="text">Garage</span>
                    </a>
                </li>
                <li onClick={() => selectionChanged()}>
                    <a>
                        <img src={Frens} alt="" />
                        <span className="text">Frens</span>
                    </a>
                </li>
            </ul>
        </footer>
    );
}
