import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSearch } from '../store/action.js'
import Player from '../MainPage/Player'

const mapStateToProps = store => {
    return (console.log(store), {
        searchResults: store.searchResults.searchResults
    })
};



const mapDispatchToProps = {
    onSend: fetchSearch
};


class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            result: [],
            value: "",
        }

        this.onChange1 = e => this.setState({ value: e.target.value })
    }


    render() {
        const { searchResults } = this.props
        console.log(Array.isArray(searchResults));
        return (
            <>
                <div className="box">
                    <button className="mainpage-profile-btn"><Link to="/profile" style={{ color: "white", textDecoration: 'none' }}>Профиль</Link></button>
                    <button className="search-tomain-btn"><Link to="/" style={{ color: "white", textDecoration: 'none' }}>На главную</Link></button>
                    <div>
                        <input className="search-input" placeholder= "Введите название песни, или ее автора"onChange={this.onChange1}></input>
                        <button className="search-btn" onClick={() => this.props.onSend(this.state.value)}>Поиск</button>
                    </div>
                    {(Array.isArray(searchResults)) ? (searchResults.map((item, i) => (<div className="results-block" key={i}><p className="chart-title">{item.artist + " - " + item.songname}</p><Player track={item}></Player></div>)))
                        : (<p className="load-placeholder">LOADING...</p>)
                    }
                </div>
            </>
        );
    }

}

let ConnectedSearchPage = connect(mapStateToProps, mapDispatchToProps)(SearchPage);

export default ConnectedSearchPage;