import './achivment.sass'
import FrendPlus from '../../../../assets/icons/frendPlus.png'

export default function Achivment() {
    return (
        <div className="Achivment">
            <h2>Invite bonus</h2>
            <ul>
                <li>
                    <div className='infoContainer'>
                        <div>
                            <img src={FrendPlus} alt="" />
                            <p>Invite frens</p>
                        </div>
                        <span>20</span>
                    </div>

                </li>
            </ul>

        </div>
    )
}