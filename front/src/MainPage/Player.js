import React from 'react';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { toFavourites } from '../store/action.js'
import './Player.css'
import { ReactComponent as PlaySVG } from './logos/play.svg';
import { ReactComponent as PauseSVG } from './logos/pause.svg';
import { ReactComponent as StopSVG } from './logos/stop.svg';
import { ReactComponent as FavouritesSVG } from './logos/bookmark.svg';
import { ReactComponent as DeleteSVG } from './logos/cancel.svg';


const mapDispatchToProps = {
    toFavourites:toFavourites
};


function getTime(time) {
    if (!isNaN(time)) {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    }
}


class Player extends React.Component {


    state = {
        player: "stopped",
        currentSong: null,
        trackDuration: null,
        currentTime: null,
        profile:false,
    }
    componentDidMount() {
        this.player.addEventListener("timeupdate", e => {
            this.setState({
                currentTime: e.target.currentTime,
                trackDuration: e.target.duration
            });
            if(this.state.currentTime === this.state.trackDuration)
            (this.setState({player:"stopped"}))
        });
    }



    componentDidUpdate(prevProps, prevState) {
        if (this.state.currentSong !== prevState.currentSong) {
            let track = this.state.currentSong;
            if (track) {
                this.player.src = track;
                this.player.play();
                this.setState({ player: "playing", trackDuration: this.player.trackDuration });
            }
        }
        if (this.state.player !== prevState.player) {
            if (this.state.player === "paused") {
                this.player.pause();
            } else if (this.state.player === "stopped") {
                this.player.pause();
                this.player.currentTime = 0;
                this.setState({ currentSong: null });
            } else if (
                this.state.player === "playing" &&
                prevState.player === "paused"
            ) {
                this.player.play();
            }
        }
    }

    render() {
        const currentTime = getTime(this.state.currentTime);
        const trackDuration = getTime(this.state.trackDuration);
        const { track } = this.props;
        return (
            <>
                {this.state.player === "stopped" && (
                    <button className = "player-btn" onClick={() => this.setState({ currentSong: track.preview, player: "playing" })}><svg className="svg"><PlaySVG/></svg></button>
                )}


                {this.state.player === "paused" && (
                    <button className = "player-btn" onClick={() => this.setState({ player: "playing" })}>
                        <svg className="svg"><PlaySVG/></svg>
            </button>
                )}
                {this.state.player === "playing" && (
                    <button className = "player-btn" onClick={() => this.setState({ player: "paused" })}>
                        <svg className="svg"><PauseSVG/></svg>
            </button>
                )}
                {this.state.player === "playing" || this.state.player === "paused" ? (
                    <button className = "player-btn" onClick={() => this.setState({ player: "stopped" })}>
                       <svg className="svg"><StopSVG/></svg>
            </button>
                ) : (
                        ""
                    )}
                {this.state.player === "playing" || this.state.player === "paused" ? (
                    <div className="player-timer">
                        {currentTime} / {trackDuration}
                       
                    </div>
                ) : (
                        ""
                    )}
                <audio ref={ref => (this.player = ref)} />

                <button className = "player-btn" hidden={window.location.pathname==="/profile"? true : false} onClick={() => this.props.toFavourites(jwt_decode(localStorage.token).sub._id,track.id, track.artist.name,track.title, track.preview)}><svg className="svg"><FavouritesSVG/></svg></button>
            </>
        );
    }
}


let ConnectedPlayer = connect(null, mapDispatchToProps)(Player);
export default ConnectedPlayer;