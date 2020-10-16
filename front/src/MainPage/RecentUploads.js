import React from 'react';
import { connect } from 'react-redux';
import { fetchRecentUploads } from '../store/action.js'
import Player from './Player'

const mapStateToProps = store => {
    return ({
        recentUploads: store.fresh.recentUploads
    })
};


const mapDispatchToProps = {
    fetchRecentUploads
};

class RecentUploads extends React.Component {
    componentDidMount() {
        this.props.fetchRecentUploads();
    }

    render() {
        const { recentUploads } = this.props
        return (
            <>
                {(Array.isArray(recentUploads)) ? (recentUploads.reverse().map((item, i) => (<div className="song-block" key={i}><p className="chart-title">{item.artist + " - " + item.songname}</p><Player track={item}></Player></div>)))
                    : (<p className="load-placeholder">LOADING...</p>)
                }
            </>
        );
    }

}

let ConnectedRecentUploads = connect(mapStateToProps, mapDispatchToProps)(RecentUploads);

export default ConnectedRecentUploads;