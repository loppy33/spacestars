import './Frens.sass'
import FrensIcon from '../../assets/icons/frensIcon.png'
import TopIcon from '../../assets/icons/topicon.png'
import UserAvatar from '../../assets/icons/userAvatr.png'
import CopyImg from '../../assets/icons/copyImg.png'
import { useNavigate } from "react-router-dom";
import { WebAppProvider, BackButton } from '@vkruglikov/react-telegram-web-app';
import Footer from '../Home/components/footer/Footer'


export default function Frens() {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/spacestars/`;
        navigate(path);
    }

    return (
        <WebAppProvider
            options={{
                smoothButtonsTransition: true,
            }}
        >
            <div className="Frens">
                <div className="container">
                    <div className="frensTitleContainer">
                        <img className='icon' src={FrensIcon} alt="" />
                        <h3>Invite frens, earn <br /> bonus</h3>
                        <button onClick={() => navigate('/spacestars/top')}><img src={TopIcon} alt="" /> Top 100</button>
                    </div>
                    <div className="inviteList">
                        <h2>Invite list <span>4 frens</span></h2>

                        <ul>
                            <li>
                                <div className="info">
                                    <img src={UserAvatar} alt="" />
                                    <p>Andrew Anubis <br /> <span>Silver - 23,432 PN</span></p>
                                </div>

                                <span>17,212 PN</span>
                            </li>
                            <li>
                                <div className="info">
                                    <img src={UserAvatar} alt="" />
                                    <p>Andrew Anubis <br /> <span>Silver - 23,432 PN</span></p>
                                </div>

                                <span>17,212 PN</span>
                            </li>
                            <li>
                                <div className="info">
                                    <img src={UserAvatar} alt="" />
                                    <p>Andrew Anubis <br /> <span>Silver - 23,432 PN</span></p>
                                </div>

                                <span>17,212 PN</span>
                            </li>
                            <li>
                                <div className="info">
                                    <img src={UserAvatar} alt="" />
                                    <p>Andrew Anubis <br /> <span>Silver - 23,432 PN</span></p>
                                </div>

                                <span>17,212 PN</span>
                            </li>
                            <li>
                                <div className="info">
                                    <img src={UserAvatar} alt="" />
                                    <p>Andrew Anubis <br /> <span>Silver - 23,432 PN</span></p>
                                </div>

                                <span>17,212 PN</span>
                            </li>
                            <li>
                                <div className="info">
                                    <img src={UserAvatar} alt="" />
                                    <p>Andrew Anubis <br /> <span>Silver - 23,432 PN</span></p>
                                </div>

                                <span>17,212 PN</span>
                            </li>
                        </ul>
                        <div className="btns">
                            <button className='invite'>Invite a fren</button>
                            <button className="copy"><img src={CopyImg} alt="" /></button>

                        </div>
                    </div>
                </div>
                <BackButton onClick={routeChange} />
            </div>
        </WebAppProvider>
    )
}