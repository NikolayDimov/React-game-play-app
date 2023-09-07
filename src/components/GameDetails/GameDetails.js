import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as gameService from '../../services/gameService';


export const GameDetails = () => {
    const { gameId } = useParams();
    const [game, setGameDetails] = useState({});

    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');

    const [error, setError] = useState({
        username: '',
        comment: '',
    });



    useEffect(() => {
        gameService.getOne(gameId)
            .then(result => {
                // go to get the current game
                setGameDetails(result);
            });   
    }, [gameId]);


    const onCommentSubmit = async (e) => {
        e.preventDefault();

        const result = await gameService.addComment(gameId, {
            username,
            comment
        });

        setUsername(state => ({...state, comments: {...state.comments, [result._id]: result}}));
        setUsername('');
        setComment('');
    };



    const onUserNameChange = (e) => {
        setUsername(e.target.value);
    };

    const onUserCommentChange = (e) => {
        setComment(e.target.value);
    };



    const validateUsername = (e) => {
        const username = e.target.value;
        let errorMessage = '';

        if(username.length < 4) {
            errorMessage = 'Username must be at least 4 characters long';
        } else if (username.length > 10) {
            errorMessage = 'Username must be at most 10 characters long';

        }

        setError(state => ({...state, username: errorMessage}));
    };



    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">{game.summary}</p>

                {/* <!-- Bonus ( for Guests and Users ) --> */}
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {/* <!-- list all comments for current game (If any) --> */}
                        {game.comments && Object.values(game.comments).map(x => (
                            <li key={x._id} className="comment">
                                <p>{x.username}: {x.comment}</p>
                            </li>
                        ))}
                    </ul>

                    {!game.comments && (
                        <p className="no-comment">No comments.</p>
                    )}
                </div>

                {/* <!-- Display paragraph: If there are no games in the database --> */}

                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                <div className="buttons">
                    <a href="#" className="button">Edit</a>
                    <a href="#" className="button">Delete</a>
                </div>
            </div>

            {/* <!-- Bonus --> */}
            {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={onCommentSubmit}>
                    <input 
                        type="text" 
                        name="username" 
                        placeholder='John Doe' 
                        value={username} 
                        onChange={onUserNameChange} 
                        onBlur={validateUsername}
                    />

                    {error.username && 
                        <div style={{color:'red'}}>{error.username}</div>
                    }

                    <textarea name="comment" placeholder="Comment......" value={comment} onChange={onUserCommentChange} ></textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>

        </section>
    );
};