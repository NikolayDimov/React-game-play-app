import { GameItem } from "./GameItem/GameItem";

export const Home = ({
    games
}) => {
    return (

        <section id="welcome-world">

            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in GamesPlay</h3>
            </div>

            <img src="./images/four_slider_img01.png" alt="hero" />

            <div id="home-page">
                <h1>Latest Games</h1>

                {/* <!-- Display div: with information about every game (if any) --> */}
                {games.map(x => <GameItem key={x._id} game={x} />)}


                {/* <!-- Display paragraph: If there is no games  --> */}
                {games.length === 0 && ( <p className="no-articles">No games yet</p>)}


                {/* or */}

                {/* {games.length > 0
                    ? games.map(x => <GameItem key={x._id} game={x} />)
                    : <p className="no-articles">No games yet</p>
                } */}
                
               
            </div>

        </section>
    );
};