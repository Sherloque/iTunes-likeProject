import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history/history';
import { jwtDecode } from 'jwt-decode';
import Chart from './Chart'
import RecentUploads from './RecentUploads'
import './MainPage.css'

const mapStateToProps = store => ({
    User: store.currentUser,
});

const logoutUser = () => ({
    type: 'LOGOUT_USER',
    action: localStorage.removeItem("token")
}, history.push("/"))



class MainPage extends React.Component {
    render() {
        return (
            <div >
                {(localStorage.token) ? (
                    <div className="box"><h1>Привет, {jwtDecode(localStorage.token).sub.login}</h1>
                        <button className="mainpage-profile-btn"><Link to="/profile" style={{ color: "white", textDecoration: 'none' }}>Профиль</Link></button>
                        <button className="mainpage-search-btn"><Link to="/search" style={{ color: "white", textDecoration: 'none' }}>Поиск</Link></button>
                        <button className="mainpage-logout-btn" onClick={logoutUser}>Выйти</button>
                        <h1>DEEZER HOT 10 CHART</h1>
                        <Chart></Chart>
                        <h1>Последние загрузки пользователей</h1>
                        <RecentUploads></RecentUploads>
                    </div>

                ) : (
                        <div className="main-box">
                            <button className="mainpage-login-btn"><Link to="/login" style={{ color: "white", textDecoration: 'none' }}>Войти</Link></button>
                            <button className="mainpage-signup-btn"><Link to="/signup" style={{ color: "white", textDecoration: 'none' }}>Зарегистрироваться</Link></button>
                        </div>
                    )}
            </div>
        );
    }

}

let ConnectedMainPage = connect(mapStateToProps)(MainPage);

export default ConnectedMainPage;