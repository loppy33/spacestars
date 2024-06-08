import './Game.sass'
import BackEffect from '../../../../assets/effect.png'

import Planet1 from '../../../../assets/planet1.png'
import Planet2 from '../../../../assets/planet2.png'
import Planet3 from '../../../../assets/planet3.png'
import Planet4 from '../../../../assets/planet4.png'
import Rocket from '../../../../assets/rocket.png'

export default function Game() {
    return (
        <div className="Game">
            <h2>SPACE GAME</h2> 
            <button>PLAY</button>
            <div className="background">
                <img src={BackEffect} alt="" className="backEffect" />
                <img src={Planet1} alt="" className="planetes first" />
                <img src={Planet2} alt="" className="planetes second" />
                <img src={Planet3} alt="" className="planetes third" />
                <img src={Planet4} alt="" className="planetes fourth" />
                <img src={Rocket} alt="" className="planetes rocket" />
            </div>
        </div>
    )
}