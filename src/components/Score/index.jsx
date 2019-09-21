import React from 'react';
import {Link} from 'react-router-dom';
import './score.scss';

class Score extends React.Component {
    getTimer = (_timer) =>{
        let min = Math.floor(_timer/60);
        let sec = _timer%60;
        if(_timer<30){
            return (<span style={{color:'#f00'}}>{min<10?`0${min}`:min} : {sec<10?`0${sec}`:sec}</span>);
        }
        return (<span style={{color:'#d2a400'}}>{min<10?`0${min}`:min} : {sec<10?`0${sec}`:sec}</span>);
    }
    getClass = (isGameOn) =>{
        let className = 'score-container '
        if(isGameOn){
            className += 'game-on';
            return className;
        }
        className += 'game-off';
        return className;

    }
    
    render(){
        let { totalScore, totalTime, hits, isGameOn } = this.props.value;
        return (
            <div className={`score-container ${isGameOn?'game-on':'game-off'}`}>
                <div className="play-container">
                    <ul>
                        <li>
                            <h4 className='score'>Total Score : 
                                <span className="data"> {totalScore}</span>
                            </h4>
                        </li>
                        <li>
                            <h4 className="hits"> Hits : 
                                <span className="data"> {hits}</span>
                            </h4>
                        </li>
                        <li>
                            <h4 className="time">Time : 
                                <span className="data"> {this.getTimer(totalTime)}</span>
                            </h4>
                        </li>
                        <li>
                            <h4 className="target"> Target Reamins : 
                                <span className="data"> {this.props.target}</span>
                            </h4>
                        </li>
                    </ul>
                </div>
                <div className="game-over-container text-center">
                    <div className="heading-container">
                        <h3>Game Over</h3>
                    </div>
                    <ul>
                        <li>
                            <h4 className='score'>Score : <span>{totalScore}</span></h4>
                        </li>
                        <li>
                            <h4 className="hits">Target Hits : <span>{hits}</span></h4>
                        </li>
                        <li>
                            <h4 className="target">Target Reamins : <span>{this.props.target}</span></h4>
                        </li>
                    </ul>
                    <div className="btn-contaner mt20">
                        <Link to={`/city`} className='btn'>
                            Restart Game
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Score;