import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { changeUserInfo } from '../store/action.js'
import Favourites from './Favourites'
import UserUploads from './UserUploads'
import Upload from '../Upload/Upload'
import './ProfilePage.css'

const mapStateToProps = store => {
    return ({
    })
};

const mapDispatchToProps = {
    onSend: changeUserInfo
};



class ProfilePage extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            login: (localStorage.token) ? jwtDecode(localStorage.token).sub.login : "",
            password: "",
            verpass: "",
            firstname: (localStorage.token) ? jwtDecode(localStorage.token).sub.firstname : "",
            lastname: (localStorage.token) ? jwtDecode(localStorage.token).sub.lastname : "",
            valid:true,
            validPass:true
        }

        this.onChange1 = e => this.setState({ login: e.target.value, valid:this.validateProfileLogin(e.target.value) ? true : false })
        this.onChange2 = e => this.setState({ firstname: e.target.value,valid:this.validateProfileFirstname(e.target.value) ? true : false  })
        this.onChange3 = e => this.setState({ lastname: e.target.value,valid:this.validateProfileLastname(e.target.value) ? true : false  })
        this.onChange4 = e => this.setState({ password: e.target.value, validPass: this.validatePass(e.target.value)? true: false })
        this.onChange5 = e => this.setState({ verpass: e.target.value,validPass: this.validateSubPass(e.target.value)? true: false })
        this.validateProfileLogin = str => str.length>0 &&  (this.state.lastname.length >0) && this.state.firstname.length >0
        this.validateProfileFirstname = str => str.length>0 && (this.state.login.length >0) && this.state.lastname.length >0
        this.validateProfileLastname = str => str.length>0 && (this.state.login.length >0) && this.state.firstname.length >0
        this.validatePass = str => str === this.state.verpass 
        this.validateSubPass = str => str === this.state.password 

    }
    render() {
        return (
            ((localStorage.token)) ? (
            <div className = "profile-box">
                <h1>Профиль</h1>
                <p className="input-label">Логин:<input className="profile-input" value={this.state.login} onChange={this.onChange1}></input></p>
                <p className="input-label">Имя:<input className="profile-input" value={this.state.firstname} onChange={this.onChange2}></input></p>
                <p className="input-label">Фамилия:<input className="profile-input"  value={this.state.lastname} onChange={this.onChange3}></input></p>
                <p className="input-label">Новый пароль (опционально):<input className="profile-input"  value={this.state.password} type="password" onChange={this.onChange4}></input></p>
                <p className="input-label">Повторите новый пароль:<input className="profile-input" value={this.state.subpass} type="password" onChange={this.onChange5}></input></p>
                <button className="profile-changeInfo-btn" disabled={!(this.state.valid && this.state.validPass)}
                    onClick={() => this.props.onSend(jwtDecode(localStorage.token).sub._id,this.state.login, this.state.firstname, this.state.lastname, (this.state.password) ? (this.state.password) : null, console.log(this.state))}
                >Изменить данные</button>
                <button className="profile-tomain-btn"><Link to="/" style={{color:"white", textDecoration: 'none' }}>На главную</Link></button>




                <div className="upload-block">
                <Upload></Upload>
                </div>




                <h1>Избранное</h1>
                <Favourites></Favourites>


                <h1>ЗАГРУЖЕННОЕ</h1>
                <UserUploads></UserUploads>
            </div>
            ):(<p>UNATUHORIZED</p>)
        );
    }

}
let ConnectedProfilePage = connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
export default ConnectedProfilePage;