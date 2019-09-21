import React from "react";
import "./game.scss";
import Pin from "../Pin";
import Score from "../Score";

class Game extends React.Component {
  id = 1;
  h = 1670;
  w = 4250;
  startX = 0;
  startY = 0;
  endX = 0;
  endY = 0;
  scoreWeight = 10;
  // allPins=[1,2,3];
  state = {
    top: 0,
    left: 0,
    allPins: [],
    timerInterval: null,
    totalTime: 90,
    totalScore: 0,
    isGameOn: false,
    hits: 0
  };
  constructor(props) {
    super(props);

    this.params = props.match.params;

    // Set Map ID
    this.id = this.params.id;
    // SETUP map
    this.mapImage = new Image(this.w, this.h);
    this.mapImage.src = `/images/bg${this.id}.jpg`;
    this.setDefults(this.mapImage);
    this.state.top = this.bgY;
    this.state.left = this.bgX;
    this.isGameOn = true;
    this.state.timerInterval = this.startGameTimer();
  }
  loadTargets = tm => {
    if (tm % 5 === 0) {
      this.setPin();
    }
  };
  startGameTimer = () => {
    let timerInterval = setInterval(() => {
      if (this.state.totalTime) {
        this.loadTargets(this.state.totalTime);
        this.setState({ isGameOn: true });
        this.setState({ totalTime: this.state.totalTime - 1 });
      } else {
        clearInterval(this.state.timerInterval);
        this.gameOver();
      }
      //console.log("from timer", this.state.totalTime);
    }, 1000);
    return timerInterval;
  };

  gameOver = () => {
    this.setState({ isGameOn: false });
  };

  setDefults = img => {
    let { w, h } = this.getWinWH();
    this.bgX = -(this.w / 2 - w / 2 + 1);
    this.bgY = -(this.h / 2 - h / 2 + 1);
    this.mapStyle = {
      backgroundImage: `url('${img.src}')`,
      height: img.height,
      width: img.width
    };
  };
  getWinWH = () => {
    return {
      w: window.innerWidth,
      h: window.innerHeight
    };
  };

  playAudio = e => {
    //let el = e.currentTarget
    let audio = new Audio();
    let src = "/sound/" + e.track + ".mp3";
    audio.src = src;
    audio.play();
    return audio;
  };
  getRandomPosition = () => {
    let posX = Math.floor(Math.random() * this.w);
    let posY = Math.floor(Math.random() * this.h);
    return {
      x: posX,
      y: posY
    };
  };

  dragStart = event => {
    this.startX =
      event.nativeEvent.x ||
      (event.nativeEvent.touches && event.nativeEvent.touches[0].clientX) || 0;
    this.startY =
      event.nativeEvent.y ||
      (event.nativeEvent.touches && event.nativeEvent.touches[0].clientY) || 0;
    //console.log(event);
  };
  dragEnd = event => {
    this.endX =
      event.nativeEvent.x ||
      (event.nativeEvent.touches && event.nativeEvent.touches[0].clientX) || 0;
    this.endY =
      event.nativeEvent.y ||
      (event.nativeEvent.touches && event.nativeEvent.touches[0].clientY) || 0;
    this.dragMe(this.getDragPoints());
  };
  getDragPoints = () => {
    return {
      x: this.endX - this.startX,
      y: this.endY - this.startY
    };
  };
  dragMe = points => {
    //console.log(points);
    let { x, y } = points;
    let { w, h } = this.getWinWH();
    this.bgX = this.bgX + x;
    this.bgY = this.bgY + y;

    this.bgY = this.h < h - this.bgY ? h - this.h : this.bgY;
    this.bgY = this.bgY > 0 ? 0 : this.bgY;

    this.bgX = this.w < w - this.bgX ? w - this.w : this.bgX;
    this.bgX = this.bgX > 0 ? 0 : this.bgX;
    this.setDomBgPos(this.bgX, this.bgY);
  };

  setDomBgPos = (x, y) => {
    this.bgX = x % this.w > this.w ? this.w : x;
    this.bgY = y % this.h > this.h ? this.h : y;
    this.setState({ top: this.bgY || 0, left: this.bgX || 0 });
    if(isNaN(this.bgX)){
      debugger;
    }
  };

  //target Pin

  setPin = () => {
    //pinContainer.appendChild(getPin(getRandomPosition()));
    let opt = this.getRandomPosition();
    let pin = {
      top: opt.y,
      left: opt.x,
      backgroundImage: `url(/images/target/png/${Math.floor(
        Math.random() * 14
      )}.png)`
    };
    let arr = this.state.allPins;
    arr.push(pin);
    this.setState({ allPins: arr });
    this.playAudio({ track: "pin" });
  };

  removePin = (pinIndex,event) => {
    let arr = [...this.state.allPins];
    if (arr.length > -1) {
      this.playAudio({ track: "hit" });
      document.getElementById(
        `pin-${pinIndex}`
      ).style.backgroundImage = `url(/images/target/blast.gif)`;
      this.setState({ allPins: arr });
      setTimeout(() => {
        arr.splice(pinIndex, 1);
        this.setState({ allPins: arr });
      }, 500);
    }
  };
  hitTarget = (target,ev) => {
    if (this.state.isGameOn) {
      console.log(ev)
      this.removePin(target,ev);
      this.setState({
        totalTime: this.state.totalTime + 3,
        hits: this.state.hits + 1,
        totalScore: this.state.totalScore + this.scoreWeight
      });
    }
  };
  getScore = () => {
    let { totalScore, totalTime, hits, isGameOn } = this.state;
    return { totalScore,  totalTime,isGameOn, hits};
  };
  render() {
    return (
      <div className="game-container">
        <div
          className="city-container"
          onMouseDown={this.dragStart}
          onMouseUp={this.dragEnd}
          onTouchStart={this.dragStart}
          onTouchMove={this.dragEnd}
        >
          <div
            className="map-container"
            style={{
              ...this.mapStyle,
              top: this.state.top,
              left: this.state.left
            }}
          >
            {this.state.allPins.map((pin, i) => (
              <Pin
                key={i}
                id={i}
                style={pin}
                mouseOver={() => {
                  this.playAudio({ track: "load" });
                }}
                hitPin={(event) => {
                  this.hitTarget(i,event);
                }}
              />
            ))}
          </div>
        </div>
        <Score value={this.getScore()} target={this.state.allPins.length} />
      </div>
    );
  }
  componentDidMount() {
    // this.resetDom();
  }
}

export default Game;
