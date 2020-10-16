import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {logUs} from '../store/action.js'
import './LoginPage.css'




class LoginPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      login: "",
      password: "",
      valid:false,

    }
    this.onChange1 = e => this.setState({ login: e.target.value, valid:this.loginValidation(e.target.value)? true: false })
    this.onChange2 = e => this.setState({ password: e.target.value, valid:this.passValidation(e.target.value)? true: false  })
    this.loginValidation =str => str.length>0 && this.state.password.length >0
    this.passValidation = str => str.length>0 && this.state.login.length >0
  }
  render() {
    return (
      <div className="login-box">
        <h1>Авторизация</h1>
        <input className="loginpage-login" type="text" value={this.state.login} onChange={this.onChange1} placeholder="login"></input>
        <input className="loginpage-password" type="password" value={this.state.password} onChange={this.onChange2} placeholder="password"></input>
        <button className="loginpage-login-btn" disabled ={!this.state.valid}
          onClick={() => this.props.onSend(this.state.login, this.state.password)}
        >Войти</button>
        <button className="loginpage-signup-btn"><Link to="/signup" style={{color:"white", textDecoration: 'none' }}>Зарегистрироваться</Link></button>
        <button className="loginpage-cancel-btn"><Link to="/" style={{color:"white", textDecoration: 'none' }}>Отмена</Link></button>
      </div>
    );
  }

}

let ConnectedLoginPage = connect(null, { onSend: logUs })(LoginPage)

export default ConnectedLoginPage;