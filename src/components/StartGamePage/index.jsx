import React from 'react';
import {Link} from 'react-router-dom';
import './start-game.scss';


class StartGame extends React.Component {
    constructor(props){
        super(props);
        this.id = props.match.params.id || 1;
        this.url = `/city/${this.id}/game`;
    }

    render(){
        return (
            <div className="start-game-container">
                <div className="inner-wrapper">
                    <ol className="help">
                        <li>
                            <p>Click button to <strong>START</strong> the game</p>
                        </li>
                        <li>
                            <p>You will have <strong>90</strong> seconds</p>
                        </li>
                        <li>
                            <p>on every hit you'll rewarded by <strong>10 points</strong>  and time increment of <strong>3 second</strong></p>
                        </li>
                        <li>
                            <p>Enjoy!</p>
                        </li>
                    </ol>
                    <div className="text-center">
                        <Link to={this.url} className='btn'>
                            Start Game
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default StartGame;