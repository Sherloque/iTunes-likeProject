import React from 'react';
import { connect } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import {fetchPersonalUploads} from '../store/action.js'
import Player from '../MainPage/Player'
import './Favourites.css'

const mapStateToProps = store => {
   return  (console.log(store),{
    userUploads: store.userUploads.userUploads,
})
}
;


const mapDispatchToProps = {
    fetchPersonalUploads
  };
  
class UserUploads extends React.Component {
    componentDidMount() {
        this.props.fetchPersonalUploads(jwtDecode(localStorage.token).sub._id);
      }

    render() {
       let uSongs = this.props
        return (
           <>
            {(uSongs.userUploads.length>0 )? (uSongs.userUploads.map((item,i) => (<div className = "song-block" key={i}><p className = "favourites-title">{item.artist+ " - " + item.songname}</p><Player track={item}></Player></div>)))
            : (<p className="load-placeholder">Waiting for songs...</p>)}
            </>
        );
    }

}

let ConnectedUserUploads = connect(mapStateToProps, mapDispatchToProps)(UserUploads);

export default ConnectedUserUploads;