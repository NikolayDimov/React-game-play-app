import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import * as gameService from './services/gameService';

import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
// import { Register } from "./components/Register/Register";
import { CreateGame } from "./components/CreateGame/CreateGame";
import { Catalog } from "./components/Catalog/Catalog";
import { GameDetails } from './components/GameDetails/GameDetails';


// Lazy Loading Functions
const Register = lazy(() => import('./components/Register/Register'));


function App() {
    const navigate = useNavigate();

    const [games, setGames] = useState([]);

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                console.log(result); // return all games
                setGames(result);
            });
    }, []);


    const onCreateGameSubmit = async (data) => {
        // console.log(data);

        const newGame = await gameService.create(data);

        // Add to state
        setGames(state => [...state, newGame]);

        // Redirect to catalog
        navigate('/catalog');
    };


    return (

        <div id="box">
            <Header />

            <main id="main-content">
                <Routes>
                    <Route path='/' element={<Home games={games} />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={
                        <Suspense fallback={<span>Loading...</span>}>
                            <Register />
                        </Suspense> } 
                    />
                    <Route path='/createGame' element={<CreateGame onCreateGameSubmit={onCreateGameSubmit} />} />
                    <Route path='/catalog' element={<Catalog games={games} />} />
                    <Route path='catalog/:gameId' element={<GameDetails />} />
                </Routes>
            </main>

            <Footer />
        </div>



    );
}

export default App;
