import React from 'react';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import {fetchPersonalFavourites} from '../store/action.js'
import Player from '../MainPage/Player'
import './Favourites.css'

const mapStateToProps = store => {
   return  ({
    favouriteSongs: store.favourites.favouriteSongs,
})
}
;


const mapDispatchToProps = {
    fetchPersonalFavourites
  };
  
class Favourites extends React.Component {
    componentDidMount() {
        this.props.fetchPersonalFavourites(jwt_decode(localStorage.token).sub._id);
      }

    render() {
        let fSongs = this.props
        return (
            <>
            {(fSongs.favouriteSongs.length>0 )? (fSongs.favouriteSongs.map((item,i) => (<div className = "song-block" key={i}><p className = "favourites-title">{item.artist+ " - " + item.songname}</p><Player track={item}></Player></div>)))
            : (<p className="load-placeholder">Waiting for songs...</p>)}
            </>
        );
    }

}

let ConnectedFavourites = connect(mapStateToProps, mapDispatchToProps)(Favourites);

export default ConnectedFavourites;