import User from "../User";
import Farm from "./components/farm/Farm";
import Footer from "./components/footer/Footer";
import Game from "./components/game/Game";

export default function Home({checkBalance, setCheckBalance}) {

    return (
        <div className="Home">
            <div className="container">
                <User checkBalance={checkBalance}  />
                <Game/>
                <Farm setCheckBalance={setCheckBalance}/>
                <Footer/>
            </div>
        </div>
    )
}