import User from "../User";
import Farm from "./components/farm/Farm";
import Footer from "./components/footer/Footer";
import Game from "./components/game/Game";

export default function Home({balance, setBalance, userPhoto}) {

    return (
        <div className="Home">
            <div className="container">
                <User balance={balance} userPhoto={userPhoto}/>
                <Game />
                <Farm setBalance={setBalance}/>
                <Footer />
            </div>
        </div>
    )
}