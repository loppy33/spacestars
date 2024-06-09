import './starships.sass'
import Twin from '../../../../assets/twin.png'

export default function Starships() {
    return (
        <ul className="Starships">

            <li className='buyed'>
                <img src={Twin} alt="" />
                <p>Galaxy ship <br /> <span>5,400 PN</span></p>
                <button>Selected</button>
            </li>
            <li>
                <img src={Twin} alt="" />
                <p>Galaxy ship <br /> <span>5,400 PN</span></p>
                <button>Buy</button>
            </li>
            <li>
                <img src={Twin} alt="" />
                <p>Galaxy ship <br /> <span>5,400 PN</span></p>
                <button>Buy</button>
            </li>
            <li>
                <img src={Twin} alt="" />
                <p>Galaxy ship <br /> <span>5,400 PN</span></p>
                <button>Buy</button>
            </li>
        </ul>
    )
}