import { Link } from 'react-router-dom';

export const GameItem = ({
    game
}) => {
    return (

        <div className="game">
            <div className="image-wrap">
                <img src={game.imageUrl} />
            </div>
            <h3>{game.title} dynaic</h3>
            <div className="rating">
                <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
            </div>
            <div className="data-buttons">
                <Link to={`/catalog/${game._id}`} className="details-button">Details</Link>
            </div>
        </div>

    );
};