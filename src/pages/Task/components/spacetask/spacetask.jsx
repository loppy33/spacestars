import './spacetask.sass'
import Succes from "../../../../assets/icons/succes.png"

import Twitter from "../../../../assets/icons/twitter.png"
import Telegram from "../../../../assets/icons/teleg.png"

export default function SpaceTask() {
    return (
        <div className="SpaceTask">
            <h2>Basic Tasks</h2>
            <ul>
                <li>
                    <div className="info">
                        <img className='icon' src={Twitter} alt="" />
                        <p>Follow on twitter(X) <br /> <span>+ 400 PN</span></p>
                    </div>
                    <img className='completed' src={Succes} alt="" />
                </li>
                <li>
                    <div className="info">
                        <img className='icon' src={Telegram} alt="" />
                        <p>Join News channel <br /> <span>+ 400 PN</span></p>
                    </div>
                    <button>Go</button>
                </li>
            </ul>
            <h2>Daily Tasks</h2>
            <ul>
                <li>
                    <div className="info">
                        <img className='icon' src={Twitter} alt="" />
                        <p>Follow on twitter(X) <br /> <span>+ 400 PN</span></p>
                    </div>
                    <button>Go</button>
                </li>
                <li>
                    <div className="info">
                        <img className='icon' src={Telegram} alt="" />
                        <p>Join News channel <br /> <span>+ 400 PN</span></p>
                    </div>
                    <button>Go</button>
                </li>
            </ul>
        </div>
    )
}