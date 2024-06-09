import './rockets.sass'

import Twin from '../../../../assets/twin.png'

export default function Rockets() {
    return (
        <ul className="Rockets">
            
            <li>
                <img src={Twin} alt="" />
                <p>Twin turbine <br /> <span>5,400 PN</span></p>
                <button>Upgrade</button>
            </li>
            <li>
                <img src={Twin} alt="" />
                <p>Twin turbine <br /> <span>5,400 PN</span></p>
                <button>Upgrade</button>
            </li>
            <li>
                <img src={Twin} alt="" />
                <p>Twin turbine <br /> <span>5,400 PN</span></p>
                <button>Upgrade</button>
            </li>
            <li>
                <img src={Twin} alt="" />
                <p>Twin turbine <br /> <span>5,400 PN</span></p>
                <button>Upgrade</button>
            </li>
        </ul>
    )
}