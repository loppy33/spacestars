import './Game.sass'
import BackEffect from '../../../../assets/effect.png'

import Planet1 from '../../../../assets/planet1.png'
import Planet2 from '../../../../assets/planet2.png'
import Planet3 from '../../../../assets/planet3.png'
import Planet4 from '../../../../assets/planet4.png'
import Rocket from '../../../../assets/Rocket_sil.png'

export default function Game() {
    return (
        <div className="Game">
            <h2>SPACE GAME</h2>
            <button>PLAY</button>
            <div className="background">
                <img src={BackEffect} alt="" className="backEffect" />
                <img src={Planet1} alt="" className="planets first" />
                <img src={Planet2} alt="" className="planets second" />
                <img src={Planet3} alt="" className="planets third" />
                <img src={Planet4} alt="" className="planets fourth" />
                <div className='planets rocket'>
                    <img src={Rocket} alt="" />
                </div>

            </div>
        </div>
    )
}