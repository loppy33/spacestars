import './starships.sass'
import Twin from '../../../../assets/twin.png'

import Rocket1 from '../../../../assets/rocket1.png'
import Rocket2 from '../../../../assets/rocket2.png'
import Rocket3 from '../../../../assets/rocket3.png'
import Rocket4 from '../../../../assets/rocket4.png'
import Rocket5 from '../../../../assets/rocket5.png'
import Rocket6 from '../../../../assets/rocket6.png'
import Rocket7 from '../../../../assets/rocket7.png'
import Rocket8 from '../../../../assets/rocket8.png'
import Rocket9 from '../../../../assets/rocket9.png'
import Rocket10 from '../../../../assets/rocket10.png'

export default function Starships() {
    const rockets = [Rocket1, Rocket2, Rocket3, Rocket4, Rocket5, Rocket6, Rocket7, Rocket8, Rocket9, Rocket10]

    function renderStarships() {
        return rockets.map((rocket, index) => (
            <li key={index}>
                <img src={rocket} alt={`Rocket ${index + 1}`} />
                <p>Galaxy ship <br /> <span>5,400 PN</span></p>
                <button>Buy</button>
            </li>
        ));
    }

    return (
        <ul className="Starships">
            {renderStarships()}
        </ul>
    )
}
