import './User.sass'
import UserAvatr from "../assets/avatar.png"
import UserRank from "../assets/rank.png"
import Border from "../assets/border.png"

export default function User() {

    return (
        <div className="User">
            <div className="avatarContainer">
                <img className='avatar' src={UserAvatr} alt="" />
                <img className='rank' src={UserRank} alt="" />
                <img src={Border} className='border' alt="" />
            </div>
            <h3>alexsandr.t</h3>
            <h2>50,094.434</h2>
        </div>
    )
}
