import React from 'react';
import { connect } from 'react-redux';
import { fetchHotChart } from '../store/action.js'
import Player from './Player'
import './Chart.css'

const mapStateToProps = store => {
    return ({
        chartSongs: store.chart.chartSongs
    })
};


const mapDispatchToProps = {
    fetchHotChart
};

class Chart extends React.Component {
    componentDidMount() {
        this.props.fetchHotChart();
    }

    render() {
        const { chartSongs } = this.props
        return (
            <>
                {(chartSongs.data) ? (chartSongs.data.map((item, i) => (<div className="song-block" key={i}><p className="chart-title">{item.position + "." + item.artist.name + " - " + item.title}</p><Player track={item}></Player></div>)))
                    : (<p className="load-placeholder">LOADING...</p>)}
            </>
        );
    }

}

let ConnectedChart = connect(mapStateToProps, mapDispatchToProps)(Chart);

export default ConnectedChart;