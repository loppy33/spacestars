import './achivment.sass'
import FrendPlus from '../../../../assets/icons/frendPlus.png'
import frendPrem from '../../../../assets/icons/frenPrem.png'
import Money100 from '../../../../assets/m100.png'
import Money200 from '../../../../assets/m200.png'
import Money500 from '../../../../assets/m500.png'
import Money1000 from '../../../../assets/m1000.png'

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
                    <ul>
                        <li className='active'>
                            <img className='money' src={Money100} alt="" />
                            <span><img src={FrendPlus} alt="" /> 10</span>
                        </li>
                        <li className='active'>
                            <img className='money' src={Money200} alt="" />
                            <span><img src={FrendPlus} alt="" /> 20</span>
                        </li>
                        <li>
                            <img className='money' src={Money500} alt="" />
                            <span><img src={FrendPlus} alt="" /> 50</span>
                        </li>
                        <li>
                            <img className='money' src={Money1000} alt="" />
                            <span><img src={FrendPlus} alt="" /> 100</span>
                        </li>

                    </ul>
                </li>
                <li>
                    <div className='infoContainer'>
                        <div>
                            <img src={frendPrem} alt="" />
                            <p>Invite frens</p>
                        </div>
                        <span>20</span>
                    </div>
                    <ul>
                        <li>
                            <img className='money' src={Money100} alt="" />
                            <span><img src={FrendPlus} alt="" /> 10</span>
                        </li>
                        <li>
                            <img className='money' src={Money200} alt="" />
                            <span><img src={FrendPlus} alt="" /> 20</span>
                        </li>
                        <li>
                            <img className='money' src={Money500} alt="" />
                            <span><img src={FrendPlus} alt="" /> 50</span>
                        </li>
                        <li>
                            <img className='money' src={Money1000} alt="" />
                            <span><img src={FrendPlus} alt="" /> 100</span>
                        </li>

                    </ul>
                </li>
            </ul>

        </div>
    )
}